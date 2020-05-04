import { IRole } from 'app/shared/model/role.model';
import { IOrganization } from 'app/shared/model/organization.model';

export interface IBranch {
  id?: number;
  desription?: string;
  latitud?: number;
  longitud?: number;
  roles?: IRole[];
  organization?: IOrganization;
}

export class Branch implements IBranch {
  constructor(
    public id?: number,
    public desription?: string,
    public latitud?: number,
    public longitud?: number,
    public roles?: IRole[],
    public organization?: IOrganization
  ) {}
}
