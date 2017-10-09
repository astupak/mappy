import { ILocation } from '../location/model';

export interface IAppState {
  locations: ILocation[];
  selected: number;
  _id: number;
}