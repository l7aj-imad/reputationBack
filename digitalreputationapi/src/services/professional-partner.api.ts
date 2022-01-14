import * as Config from 'config';
import {
  defaultIfEmpty,
  mergeMap,
  Observable,
  ObservableInput,
  of,
} from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
/**
 * Caller vers l'API de Professional Partner
 */
@Injectable()
export class ProfessionalPartnerAPI {
  private _backends;

  constructor(private _http: HttpService) {
    const ret = {};
    let back = `${Config.get(
      'api.professional_partner.protocol',
    )}://${Config.get('api.professional_partner.host')}}`;
    if (Config.get('api.professional_partner.port')) {
      back += `:${Config.get('api.professional_partner.port')}}`;
    }
    Object.keys(Config.get('api.professional_partner.uri')).forEach(
      (k) =>
        (ret[k] = `${back}${Config.get('api.professional_partner.uri')[k]}`),
    );

    this._backends = ret;
  }

  /**
   * Obtenir une tâche
   * @param id Identifiant de la tâche
   */
  exists(id: string): Observable<boolean> {
    return this._http.get<boolean>(this._backends.task.replace(id)).pipe(
      filter((_) => !!_),
      defaultIfEmpty(false),
      mergeMap<boolean, ObservableInput<boolean>>((_) => of(_)),
    );
  }
}
