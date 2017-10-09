import { ILocation } from '../location/model';

export interface IAppState {
  rawLocations: ILocation[];
  locations: ILocation[];
  selected: number;
  filter: string;
  _id: number;
}