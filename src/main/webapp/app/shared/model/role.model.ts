import { INeeddonation } from 'app/shared/model/needdonation.model';
import { IDonations } from 'app/shared/model/donations.model';
import { IUser } from 'app/core/user/user.model';
import { IDetailDriver } from 'app/shared/model/detail-driver.model';
import { IBranch } from 'app/shared/model/branch.model';

export interface IRole {
  id?: number;
  pointConsumption?: boolean;
  donor?: boolean;
  driver?: boolean;
  admin?: boolean;
  needdonations?: INeeddonation[];
  donations?: IDonations[];
  user?: IUser;
  rol?: IDetailDriver;
  branch?: IBranch;
}

export class Role implements IRole {
  constructor(
    public id?: number,
    public pointConsumption?: boolean,
    public donor?: boolean,
    public driver?: boolean,
    public admin?: boolean,
    public needdonations?: INeeddonation[],
    public donations?: IDonations[],
    public user?: IUser,
    public rol?: IDetailDriver,
    public branch?: IBranch
  ) {
    this.pointConsumption = this.pointConsumption || false;
    this.donor = this.donor || false;
    this.driver = this.driver || false;
    this.admin = this.admin || false;
  }
}
