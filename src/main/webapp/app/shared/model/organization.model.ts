import { IBranch } from 'app/shared/model/branch.model';
import { TipoOrg } from 'app/shared/model/enumerations/tipo-org.model';

export interface IOrganization {
  id?: number;
  razonSocial?: string;
  cuit?: number;
  tipo?: TipoOrg;
  description?: string;
  braches?: IBranch[];
}

export class Organization implements IOrganization {
  constructor(
    public id?: number,
    public razonSocial?: string,
    public cuit?: number,
    public tipo?: TipoOrg,
    public description?: string,
    public braches?: IBranch[]
  ) {}
}
