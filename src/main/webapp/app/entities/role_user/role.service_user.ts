import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRole } from 'app/shared/model/role.model';

type EntityResponseType = HttpResponse<IRole>;
type EntityResponseTypeAny = HttpResponse<any>;

type EntityArrayResponseType = HttpResponse<IRole[]>;
type EntityArrayResponseTypeAny = HttpResponse<any[]>;

@Injectable({ providedIn: 'root' })
export class RoleService {
  public resourceUrl = SERVER_API_URL + 'api/roles';
  public resourceUrl2 = SERVER_API_URL + 'api/roleslogin';
  public resourceUrl3 = SERVER_API_URL + 'api/rolesuser';

  constructor(protected http: HttpClient) {}

  create(role: IRole): Observable<EntityResponseType> {
    return this.http.post<IRole>(this.resourceUrl, role, { observe: 'response' });
  }

  update(role: IRole): Observable<EntityResponseType> {
    return this.http.put<IRole>(this.resourceUrl, role, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRole>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  finduser(id: number): Observable<EntityResponseType> {
    return this.http.get<IRole>(`${SERVER_API_URL + 'api/roles/user'}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRole[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  rolebranch(id: number): Observable<EntityArrayResponseTypeAny> {
    return this.http.get<any[]>(`${this.resourceUrl3}/${id}`, { observe: 'response' });
  }
  rolelogin(id: number): Observable<EntityResponseTypeAny> {
    return this.http.get<any>(`${this.resourceUrl2}/${id}`, { observe: 'response' });
  }
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
