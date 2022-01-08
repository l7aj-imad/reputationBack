import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Rate, RateDocument } from '../rate.schema';
import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RateDto } from '../dto/rate.dto';

@Injectable()
export class RateDao {
  /**
   * Class constructor
   *
   * @param {Model<RateDocument>} _rateModel instance of the model representing a Rate
   */
  constructor(
    @InjectModel(Rate.name)
    private readonly _rateModel: Model<RateDocument>,
  ) {}

  /**
   * Returns one Rate of the list matching id in parameter
   *
   * @param {string} id of the Rate in the db
   *
   * @return {Observable<Rate | void>}
   */
  findById = (id: string): Observable<Rate | void> =>
    from(this._rateModel.findById(id)).pipe(
      filter((doc: RateDocument) => !!doc),
      map((doc: RateDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one Rate of the list matching professional id in parameter
   *
   * @param {string} id of the professional in the db
   *
   * @return {Observable<Rate | void>}
   */
  findByProfessionalId = (id: string): Observable<Rate[] | void> =>
    from(this._rateModel.find({ professionalId: id })).pipe(
      filter((docs: RateDocument[]) => !!docs && docs.length > 0),
      map((docs: RateDocument[]) => docs.map((_: RateDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );

  /**
   * Returns  list of rates
   *
   * @return {Observable<Rate | void>}
   */
  find = (): Observable<Rate[] | void> => {
    return from(this._rateModel.find()).pipe(
      filter((docs: RateDocument[]) => !!docs && docs.length > 0),
      map((docs: RateDocument[]) => docs.map((_: RateDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * Check if name already exists with index and add it in Rate list
   *
   * @param {RateDto} rate to create
   *
   * @return {Observable<Rate>}
   */
  add = (rate: RateDto): Observable<Rate> =>
    from(new this._rateModel(rate).save()).pipe(
      map((doc: RateDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Update
   *
   * @param {string} id
   * @param {RateDto} Rate
   *
   * @return {Observable<Rate | void>}
   */
  update = (id: string, Rate: RateDto): Observable<Rate | void> =>
    from(
      this._rateModel.findByIdAndUpdate(id, Rate, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: RateDocument) => !!doc),
      map((doc: RateDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Delete
   *
   * @param {string} id
   *
   * @return {Observable<Rate | void>}
   */
  delete = (id: string): Observable<Rate | void> =>
    from(this._rateModel.findByIdAndRemove(id)).pipe(
      filter((doc: RateDocument) => !!doc),
      map((doc: RateDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
