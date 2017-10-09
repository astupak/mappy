
import { FluxStandardAction } from 'flux-standard-action';
import { ILocation } from '../location/model';

export type LocationAction = FluxStandardAction<any, string>;

export class LocationActions {
  static readonly ADD_LOCATION = 'ADD_LOCATION';
  static readonly DELETE_LOCATION = 'DELETE_LOCATION';
  static readonly PICK_LOCATION = 'PICK_LOCATION';
  static readonly SET_FILTER = 'SET_FILTER';
  static readonly APPLY_FILTER = 'APPLY_FILTER';

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

  static setFilter(payload: string) {
    return {
      type: LocationActions.SET_FILTER,
      payload,
    };
  }

  static applyFilter() {
    return {
      type: LocationActions.APPLY_FILTER,
      payload: null
    };
  }
}
