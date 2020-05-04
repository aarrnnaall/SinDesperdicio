import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INutrition } from 'app/shared/model/nutrition.model';

type EntityResponseType = HttpResponse<INutrition>;
type EntityArrayResponseType = HttpResponse<INutrition[]>;

@Injectable({ providedIn: 'root' })
export class NutritionService {
  public resourceUrl = SERVER_API_URL + 'api/nutritions';

  constructor(protected http: HttpClient) {}

  create(nutrition: INutrition): Observable<EntityResponseType> {
    return this.http.post<INutrition>(this.resourceUrl, nutrition, { observe: 'response' });
  }

  update(nutrition: INutrition): Observable<EntityResponseType> {
    return this.http.put<INutrition>(this.resourceUrl, nutrition, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INutrition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INutrition[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
