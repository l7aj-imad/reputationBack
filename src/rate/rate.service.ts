import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { RateDao } from './dao/rate.dao';
import { RateEntity } from './entity/rate.entity';
import { Rate } from './rate.schema';
import { RateDto } from './dto/rate.dto';
import * as moment from 'moment';

@Injectable()
export class RateService {
  /**
   * Class constructor
   *
   * @param {RateDao} _rateDao instance of the DAO
   */
  constructor(private readonly _rateDao: RateDao) {}

  /**
   * Returns all existing Rates in the list
   *
   * @returns {Observable<RateEntity[] | void>}
   */
  find = (): Observable<RateEntity[] | void> =>
    this._rateDao.find().pipe(
      filter((_: Rate[]) => !!_),
      map((_: Rate[]) => _.map((__: Rate) => new RateEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one Rate of the list matching id in parameter
   *
   * @param {string} id of the Rate
   *
   * @returns {Observable<RateEntity>}
   */
  findById = (id: string): Observable<RateEntity> =>
    this._rateDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Rate) =>
        !!_
          ? of(new RateEntity(_))
          : throwError(
              () => new NotFoundException(`Rate with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if  already exists and add it in list
   *
   * @param rate to create
   *
   * @returns {Observable<RateEntity>}
   */
  add = (rate: RateDto): Observable<RateEntity> => {
    rate.date = moment().utc().format();
    return this._rateDao.add(rate).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Rate) => new RateEntity(_)),
    );
  };

  /**
   * Update
   *
   * @param {string} id
   * @param Rate data to update
   *
   * @returns {Observable<RateEntity>}
   */
  update = (id: string, Rate: RateDto): Observable<RateEntity> =>
    this._rateDao
      .update(id, Rate)
      .pipe(
        mergeMap((_: Rate) =>
          !!_
            ? of(new RateEntity(_))
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
