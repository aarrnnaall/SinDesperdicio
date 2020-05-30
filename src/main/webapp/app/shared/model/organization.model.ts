import { IBranch } from 'app/shared/model/branch.model';
import { TipoOrg } from 'app/shared/model/enumerations/tipo-org.model';

export interface IOrganization {
  id?: number;
  razonSocial?: string;
  tipo?: TipoOrg;
  description?: string;
  cuit?: string;
  braches?: IBranch[];
}

export class Organization implements IOrganization {
  constructor(
    public id?: number,
    public razonSocial?: string,
    public tipo?: TipoOrg,
    public description?: string,
    public cuit?: string,
    public braches?: IBranch[]
  ) {}
}
