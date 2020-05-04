import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocationDriver } from 'app/shared/model/location-driver.model';

type EntityResponseType = HttpResponse<ILocationDriver>;
type EntityArrayResponseType = HttpResponse<ILocationDriver[]>;

@Injectable({ providedIn: 'root' })
export class LocationDriverService {
  public resourceUrl = SERVER_API_URL + 'api/location-drivers';

  constructor(protected http: HttpClient) {}

  create(locationDriver: ILocationDriver): Observable<EntityResponseType> {
    return this.http.post<ILocationDriver>(this.resourceUrl, locationDriver, { observe: 'response' });
  }

  update(locationDriver: ILocationDriver): Observable<EntityResponseType> {
    return this.http.put<ILocationDriver>(this.resourceUrl, locationDriver, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocationDriver>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocationDriver[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
