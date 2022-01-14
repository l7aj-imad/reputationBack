import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { RateDocument, Rating } from '../rating.schema';
import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, mergeMap, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RatingDto } from '../dto/rating.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { ProfessionalPartnerAPI } from '../../services/professional-partner.api';

@Injectable()
export class RatingDao {
  /**
   * Class constructor
   *
   * @param {Model<RateDocument>} _rateModel instance of the model representing a Rate
   * @param _ppApi API Professional Partner
   */
  constructor(
    @InjectModel(Rating.name)
    private readonly _rateModel: Model<RateDocument>,
    private readonly _ppApi: ProfessionalPartnerAPI,
  ) {}

  /**
   * Returns one Rate of the list matching professional id in parameter
   *
   * @param {string} id of the professional in the db
   *
   * @return {Observable<Rating[] | void>}
   */
  findByProfessionalId = (id: string): Observable<Rating[] | void> =>
    from(this._rateModel.find({ professionalId: id })).pipe(
      filter((docs: RateDocument[]) => !!docs && docs.length > 0),
      map((docs: RateDocument[]) => docs.map((_: RateDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );

  /**
   * Returns one Rate of the list matching task id or rating id in parameter
   *
   * @param {string} id of the task or the rating in the db
   *
   * @return {Observable<Rating[] | void>}
   */
  findById = (id: string): Observable<Rating | void> =>
    from(
      this._rateModel.findOne(
        Types.ObjectId.isValid(id)
          ? { $or: [{ _id: id }, { taskId: id }] }
          : { taskId: id },
      ),
    ).pipe(
      filter((doc: RateDocument) => !!doc),
      map((doc: RateDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns list of ratings
   *
   * @return {Observable<Rating[] | void>}
   */
  find = (): Observable<Rating[] | void> => {
    return from(this._rateModel.find()).pipe(
      filter((docs: RateDocument[]) => !!docs && docs.length > 0),
      map((docs: RateDocument[]) => docs.map((_: RateDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * Add a new rating
   *
   * @param {RatingDto} rating Rating to create
   *
   * @return {Observable<Rating>}
   */
  add = (rating: RatingDto): Observable<Rating> =>
    of(null).pipe(
      mergeMap(() => {
        return this._ppApi.exists(rating.taskId);
      }),
      mergeMap((exists: boolean) => {
        if (exists) {
          return from(new this._rateModel(rating).save()).pipe(
            map((doc: RateDocument) => doc.toJSON()),
            defaultIfEmpty(undefined),
          );
        } else {
          throw new UnauthorizedException(
            "There isn't any task associated to this task ID",
          );
        }
      }),
    );
  /**
   * Update the rating
   *
   * @param {string} id Id of the rating
   * @param {UpdateRatingDto} rating New rating
   *
   * @return {Observable<Rating | void>}
   */
  update = (id: string, rating: UpdateRatingDto): Observable<Rating | void> =>
    from(
      this._rateModel.findOneAndUpdate(
        Types.ObjectId.isValid(id)
          ? { $or: [{ _id: id }, { taskId: id }] }
          : { taskId: id },
        { $set: rating },
        {
          new: true,
          runValidators: true,
        },
      ),
    ).pipe(
      filter((doc: RateDocument) => !!doc),
      map((doc: RateDocument) => {
        console.log(id);
        return doc.toJSON();
      }),
      defaultIfEmpty(undefined),
    );

  /**
   * Delete one task by id or the task id
   *
   * @param {string} id Id of the task or the rating
   *
   * @return {Observable<Rating | void>}
   */
  delete = (id: string): Observable<Rating | void> =>
    from(
      this._rateModel.findOneAndRemove(
        Types.ObjectId.isValid(id)
          ? { $or: [{ _id: id }, { taskId: id }] }
          : { taskId: id },
        {
          new: true,
          runValidators: true,
        },
      ),
    ).pipe(
      filter((doc: RateDocument) => !!doc),
      map((doc: RateDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
