import { LatLng } from 'leaflet';

export interface ILocation {
  latLng: LatLng;
  size: number;
  name: string
}