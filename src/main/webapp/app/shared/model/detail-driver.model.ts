import { IRole } from 'app/shared/model/role.model';
import { ILocationDriver } from 'app/shared/model/location-driver.model';

export interface IDetailDriver {
  id?: number;
  availabilityday?: string;
  availabilitytime?: string;
  drive?: IRole;
  locationdrivers?: ILocationDriver[];
}

export class DetailDriver implements IDetailDriver {
  constructor(
    public id?: number,
    public availabilityday?: string,
    public availabilitytime?: string,
    public drive?: IRole,
    public locationdrivers?: ILocationDriver[]
  ) {}
}
