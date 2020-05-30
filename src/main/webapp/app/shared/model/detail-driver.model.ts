import { IRole } from 'app/shared/model/role.model';
import { ILocationDriver } from 'app/shared/model/location-driver.model';
import { TipoTrans } from 'app/shared/model/enumerations/tipo-trans.model';

export interface IDetailDriver {
  id?: number;
  availabilityday?: string;
  availabilitytime?: string;
  transportation?: TipoTrans;
  drive?: IRole;
  locationdrivers?: ILocationDriver[];
}

export class DetailDriver implements IDetailDriver {
  constructor(
    public id?: number,
    public availabilityday?: string,
    public availabilitytime?: string,
    public transportation?: TipoTrans,
    public drive?: IRole,
    public locationdrivers?: ILocationDriver[]
  ) {}
}
