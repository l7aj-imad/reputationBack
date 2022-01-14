import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { RatingDao } from './dao/rating.dao';
import { RatingEntity } from './entity/rating.entity';
import { Rating } from './rating.schema';
import { RatingDto } from './dto/rating.dto';
import * as moment from 'moment';
import { ProfessionalPartnerAPI } from '../services/professional-partner.api';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  /**
   * Class constructor
   *
   * @param {RatingDao} _ratingDao instance of the DAO
   * @param _ppApi Accès à l'API Professional Partner
   */
  constructor(
    private readonly _ratingDao: RatingDao,
    private _ppApi: ProfessionalPartnerAPI,
  ) {}

  /**
   * Returns all existing Ratings in the list
   *
   * @returns {Observable<RatingEntity[] | void>}
   */
  find = (): Observable<RatingEntity[] | void> =>
    this._ratingDao.find().pipe(
      filter((_: Rating[]) => !!_),
      map((_: Rating[]) => _.map((__: Rating) => new RatingEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one Rating of the list matching id in parameter
   *
   * @param {string} id of the Rating
   *
   * @returns {Observable<RatingEntity>}
   */
  findById = (id: string): Observable<RatingEntity> =>
    this._ratingDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Rating) =>
        !!_
          ? of(new RatingEntity(_))
          : throwError(
              () => new NotFoundException(`Rating with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Returns all existing Ratings for a professional in the list
   *
   * @returns {Observable<RatingEntity[] | void>}
   */
  findByProfessionalId = (id: string): Observable<RatingEntity[] | void> =>
    this._ratingDao.findByProfessionalId(id).pipe(
      filter((_: Rating[]) => !!_),
      map((_: Rating[]) => _.map((__: Rating) => new RatingEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns a rating for a task id
   *
   * @returns {Observable<RatingEntity | void>}
   */
  findByTaskId = (taskId: string): Observable<RatingEntity> =>
    this._ppApi.exists(taskId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: boolean) =>
        !!_
          ? this._ratingDao.findById(taskId).pipe(
              catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
              ),
              mergeMap((_: Rating) =>
                !!_
                  ? of(new RatingEntity(_))
                  : throwError(
                      () =>
                        new NotFoundException(
                          `Rating with id '${taskId}' not found`,
                        ),
                    ),
              ),
            )
          : throwError(
              () =>
                new NotFoundException(`Rating with id '${taskId}' not found`),
            ),
      ),
    );

  /**
   * Check if already exists and add task in list
   *
   * @param rating Rating to create
   *
   * @returns {Observable<RatingEntity>}
   */
  add = (rating: RatingDto): Observable<RatingEntity> => {
    rating.date = moment().utc().format();
    return this._ratingDao.add(rating).pipe(
      catchError((e) =>
        throwError(() => {
          switch (e.code) {
            case 11000:
              return new ConflictException(
                'A rating associated to this task already exists',
              );
          }
        }),
      ),
      map((_: Rating) => new RatingEntity(_)),
    );
  };

  /**
   * Update
   *
   * @param {string} id
   * @param rating data to update
   *
   * @returns {Observable<RatingEntity>}
   */
  update = (id: string, rating: UpdateRatingDto): Observable<RatingEntity> =>
    this._ratingDao
      .update(id, rating)
      .pipe(
        mergeMap((_: Rating) =>
          !!_
            ? of(new RatingEntity(_))
            : throwError(
                () => new NotFoundException(`Rating with id '${id}' not found`),
              ),
        ),
      );

  /**
   * Deletes one in list
   *
   * @param {string} id
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._ratingDao.delete(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Rating) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Rating with id '${id}' not found`),
            ),
      ),
    );
}
