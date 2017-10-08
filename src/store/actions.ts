
import { FluxStandardAction } from 'flux-standard-action';
import { ILocation } from '../location/model';

export type LocationAction = FluxStandardAction<number|ILocation, string>;

export class LocationActions {
  static readonly ADD_LOCATION = 'ADD_LOCATION';
  static readonly DELETE_LOCATION = 'DELETE_LOCATION';
  static readonly PICK_LOCATION = 'PICK_LOCATION';

  static pickLocation(payload: number) {
    return {
      type: LocationActions.PICK_LOCATION,
      payload,
    };
  }

  static deleteLocation() {
    return {
      type: LocationActions.DELETE_LOCATION,
      payload: null,
    };
  }

  static addLocation(payload: ILocation) {
    return {
      type: LocationActions.ADD_LOCATION,
      payload,
    };
  }
}
