import { Moment } from 'moment';
import { IRole } from 'app/shared/model/role.model';
import { IDonations } from 'app/shared/model/donations.model';
import { TipoDuration } from 'app/shared/model/enumerations/tipo-duration.model';

export interface INeeddonation {
  id?: number;
  description?: string;
  datestart?: Moment;
  dateend?: Moment;
  availabilityday?: string;
  availabilitytime?: string;
  latitud?: number;
  longitud?: number;
  duration?: TipoDuration;
  intervalduration?: string;
  cantpeople?: number;
  point?: IRole;
  donations?: IDonations[];
}

export class Needdonation implements INeeddonation {
  constructor(
    public id?: number,
    public description?: string,
    public datestart?: Moment,
    public dateend?: Moment,
    public availabilityday?: string,
    public availabilitytime?: string,
    public latitud?: number,
    public longitud?: number,
    public duration?: TipoDuration,
    public intervalduration?: string,
    public cantpeople?: number,
    public point?: IRole,
    public donations?: IDonations[]
  ) {}
}
