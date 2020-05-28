import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDetailDriver } from 'app/shared/model/detail-driver.model';

type EntityResponseType = HttpResponse<IDetailDriver>;
type EntityArrayResponseType = HttpResponse<IDetailDriver[]>;

@Injectable({ providedIn: 'root' })
export class DetailDriverService {
  public resourceUrl = SERVER_API_URL + 'api/detail-drivers';

  constructor(protected http: HttpClient) {}

  create(detailDriver: IDetailDriver): Observable<EntityResponseType> {
    return this.http.post<IDetailDriver>(this.resourceUrl, detailDriver, { observe: 'response' });
  }

  update(detailDriver: IDetailDriver): Observable<EntityResponseType> {
    return this.http.put<IDetailDriver>(this.resourceUrl, detailDriver, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetailDriver>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetailDriver[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
