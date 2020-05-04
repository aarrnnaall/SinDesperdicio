import { IDonations } from 'app/shared/model/donations.model';

export interface INutrition {
  id?: number;
  description?: string;
  water?: number;
  calorie?: number;
  protein?: number;
  lipidTot?: number;
  ash?: number;
  carbohydrt?: number;
  fiber?: number;
  sugarTot?: number;
  calcium?: number;
  iron?: number;
  magnesium?: number;
  phosphorus?: number;
  potassium?: number;
  sodium?: number;
  zinc?: number;
  manganese?: number;
  vitC?: number;
  thiamin?: number;
  riboflavin?: number;
  niacin?: number;
  pantoAcid?: number;
  vitB6?: number;
  folateTot?: number;
  folicAcid?: number;
  foodFolate?: number;
  folateDFE?: number;
  vholineTot?: number;
  vitB12?: number;
  vitAIU?: number;
  vitARAE?: number;
  vitE?: number;
  vitD?: number;
  vitK?: number;
  donation?: IDonations;
}

export class Nutrition implements INutrition {
  constructor(
    public id?: number,
    public description?: string,
    public water?: number,
    public calorie?: number,
    public protein?: number,
    public lipidTot?: number,
    public ash?: number,
    public carbohydrt?: number,
    public fiber?: number,
    public sugarTot?: number,
    public calcium?: number,
    public iron?: number,
    public magnesium?: number,
    public phosphorus?: number,
    public potassium?: number,
    public sodium?: number,
    public zinc?: number,
    public manganese?: number,
    public vitC?: number,
    public thiamin?: number,
    public riboflavin?: number,
    public niacin?: number,
    public pantoAcid?: number,
    public vitB6?: number,
    public folateTot?: number,
    public folicAcid?: number,
    public foodFolate?: number,
    public folateDFE?: number,
    public vholineTot?: number,
    public vitB12?: number,
    public vitAIU?: number,
    public vitARAE?: number,
    public vitE?: number,
    public vitD?: number,
    public vitK?: number,
    public donation?: IDonations
  ) {}
}
