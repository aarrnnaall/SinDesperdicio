import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEat } from 'app/shared/model/eat.model';

type EntityResponseType = HttpResponse<IEat>;
type EntityArrayResponseType = HttpResponse<IEat[]>;

@Injectable({ providedIn: 'root' })
export class EatService {
  public resourceUrl = SERVER_API_URL + 'api/eats';

  constructor(protected http: HttpClient) {}

  create(eat: IEat): Observable<EntityResponseType> {
    return this.http.post<IEat>(this.resourceUrl, eat, { observe: 'response' });
  }

  update(eat: IEat): Observable<EntityResponseType> {
    return this.http.put<IEat>(this.resourceUrl, eat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
