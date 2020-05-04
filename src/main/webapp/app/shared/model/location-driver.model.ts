import { IDetailDriver } from 'app/shared/model/detail-driver.model';

export interface ILocationDriver {
  id?: number;
  latitud?: number;
  longitud?: number;
  detaildriver?: IDetailDriver;
}

export class LocationDriver implements ILocationDriver {
  constructor(public id?: number, public latitud?: number, public longitud?: number, public detaildriver?: IDetailDriver) {}
}
