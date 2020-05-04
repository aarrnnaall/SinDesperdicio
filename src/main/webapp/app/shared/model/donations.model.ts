import { Moment } from 'moment';
import { IEat } from 'app/shared/model/eat.model';
import { INeeddonation } from 'app/shared/model/needdonation.model';
import { INutrition } from 'app/shared/model/nutrition.model';
import { IRole } from 'app/shared/model/role.model';
import { TipoEat } from 'app/shared/model/enumerations/tipo-eat.model';
import { TipoDrive } from 'app/shared/model/enumerations/tipo-drive.model';

export interface IDonations {
  id?: number;
  description?: string;
  date?: Moment;
  latitud?: number;
  longitud?: number;
  availabilityday?: string;
  availabilitytime?: string;
  statuseat?: TipoEat;
  statusdrive?: TipoDrive;
  eats?: IEat[];
  needdonations?: INeeddonation[];
  nutrition?: INutrition;
  donor?: IRole;
}

export class Donations implements IDonations {
  constructor(
    public id?: number,
    public description?: string,
    public date?: Moment,
    public latitud?: number,
    public longitud?: number,
    public availabilityday?: string,
    public availabilitytime?: string,
    public statuseat?: TipoEat,
    public statusdrive?: TipoDrive,
    public eats?: IEat[],
    public needdonations?: INeeddonation[],
    public nutrition?: INutrition,
    public donor?: IRole
  ) {}
}
