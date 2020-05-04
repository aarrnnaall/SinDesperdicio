import { IDonations } from 'app/shared/model/donations.model';
import { TipoCate } from 'app/shared/model/enumerations/tipo-cate.model';

export interface IEat {
  id?: number;
  category?: TipoCate;
  canteat?: number;
  donations?: IDonations;
}

export class Eat implements IEat {
  constructor(public id?: number, public category?: TipoCate, public canteat?: number, public donations?: IDonations) {}
}
