import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDonations } from 'app/shared/model/donations.model';

type EntityResponseType = HttpResponse<IDonations>;
type EntityArrayResponseType = HttpResponse<IDonations[]>;

@Injectable({ providedIn: 'root' })
export class DonationsService {
  public resourceUrl = SERVER_API_URL + 'api/donations';

  constructor(protected http: HttpClient) {}

  create(donations: IDonations): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(donations);
    return this.http
      .post<IDonations>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(donations: IDonations): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(donations);
    return this.http
      .put<IDonations>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDonations>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDonations[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(donations: IDonations): IDonations {
    const copy: IDonations = Object.assign({}, donations, {
      date: donations.date && donations.date.isValid() ? donations.date.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((donations: IDonations) => {
        donations.date = donations.date ? moment(donations.date) : undefined;
      });
    }
    return res;
  }
}
