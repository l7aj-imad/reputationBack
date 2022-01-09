import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { RatingDao } from './dao/rating.dao';
import { RatingEntity } from './entity/rating.entity';
import { Rate } from './rating.schema';
import { RatingDto } from './dto/rating.dto';
import * as moment from 'moment';

@Injectable()
export class RatingService {
  /**
   * Class constructor
   *
   * @param {RatingDao} _rateDao instance of the DAO
   */
  constructor(private readonly _rateDao: RatingDao) {}

  /**
   * Returns all existing Rates in the list
   *
   * @returns {Observable<RatingEntity[] | void>}
   */
  find = (): Observable<RatingEntity[] | void> =>
    this._rateDao.find().pipe(
      filter((_: Rate[]) => !!_),
      map((_: Rate[]) => _.map((__: Rate) => new RatingEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one Rate of the list matching id in parameter
   *
   * @param {string} id of the Rate
   *
   * @returns {Observable<RatingEntity>}
   */
  findById = (id: string): Observable<RatingEntity> =>
    this._rateDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Rate) =>
        !!_
          ? of(new RatingEntity(_))
          : throwError(
              () => new NotFoundException(`Rate with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Returns all existing rates for a professional in the list
   *
   * @returns {Observable<RatingEntity[] | void>}
   */
  findByProfessionalId = (id: string): Observable<RatingEntity[] | void> =>
    this._rateDao.findByProfessionalId(id).pipe(
      filter((_: Rate[]) => !!_),
      map((_: Rate[]) => _.map((__: Rate) => new RatingEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if  already exists and add it in list
   *
   * @param rate to create
   *
   * @returns {Observable<RatingEntity>}
   */
  add = (rate: RatingDto): Observable<RatingEntity> => {
    rate.date = moment().utc().format();
    return this._rateDao.add(rate).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Rate) => new RatingEntity(_)),
    );
  };

  /**
   * Update
   *
   * @param {string} id
   * @param Rate data to update
   *
   * @returns {Observable<RatingEntity>}
   */
  update = (id: string, Rate: RatingDto): Observable<RatingEntity> =>
    this._rateDao
      .update(id, Rate)
      .pipe(
        mergeMap((_: Rate) =>
          !!_
            ? of(new RatingEntity(_))
            : throwError(
                () => new NotFoundException(`Rate with id '${id}' not found`),
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
    this._rateDao.delete(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Rate) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Rate with id '${id}' not found`),
            ),
      ),
    );
}
