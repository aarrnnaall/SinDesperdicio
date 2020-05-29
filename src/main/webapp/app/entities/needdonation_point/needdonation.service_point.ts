import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INeeddonation } from 'app/shared/model/needdonation.model';

type EntityResponseType = HttpResponse<INeeddonation>;
type EntityArrayResponseType = HttpResponse<INeeddonation[]>;

@Injectable({ providedIn: 'root' })
export class NeeddonationService {
  public resourceUrl = SERVER_API_URL + 'api/needdonations';

  constructor(protected http: HttpClient) {}

  create(needdonation: INeeddonation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(needdonation);
    return this.http
      .post<INeeddonation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(needdonation: INeeddonation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(needdonation);
    return this.http
      .put<INeeddonation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INeeddonation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INeeddonation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(needdonation: INeeddonation): INeeddonation {
    const copy: INeeddonation = Object.assign({}, needdonation, {
      datestart: needdonation.datestart && needdonation.datestart.isValid() ? needdonation.datestart.toJSON() : undefined,
      dateend: needdonation.dateend && needdonation.dateend.isValid() ? needdonation.dateend.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datestart = res.body.datestart ? moment(res.body.datestart) : undefined;
      res.body.dateend = res.body.dateend ? moment(res.body.dateend) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((needdonation: INeeddonation) => {
        needdonation.datestart = needdonation.datestart ? moment(needdonation.datestart) : undefined;
        needdonation.dateend = needdonation.dateend ? moment(needdonation.dateend) : undefined;
      });
    }
    return res;
  }
}
