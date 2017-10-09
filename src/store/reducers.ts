import { IAppState } from './model';
import { LocationAction, LocationActions } from './actions';
import { ILocation } from '../location/model';


export const rootReducer = function(state: IAppState, action: LocationAction): IAppState{
  switch (action.type) {
    case LocationActions.ADD_LOCATION:

      let newLocation = Object.assign({}, action.payload, { id: state._id });
      let rawLocations = [ ...state.locations, newLocation ];

      return Object.assign({}, state, {
        rawLocations,
        locations: filter(rawLocations, state.filter),
        _id: state._id+1,
      });

    case LocationActions.DELETE_LOCATION:

      if (state.selected === -1) {
        return state;
      }

      const newLocations = Array.from(state.locations);
      const newRawLocations = Array.from(state.rawLocations);

      const locationIndex = newLocations.findIndex((item) => item.id == state.selected);
      const rawLocationIndex = newRawLocations.findIndex((item) => item.id == state.selected);

      newLocations.splice(locationIndex, 1);
      newRawLocations.splice(rawLocationIndex, 1);
      
      return Object.assign({}, state, {
        rawLocations: newRawLocations,
        locations: newLocations,
        selected: -1
      });

    case LocationActions.PICK_LOCATION:
      return Object.assign({}, state, { selected: action.payload});

    case LocationActions.SET_FILTER:
      return Object.assign({}, state, { filter: action.payload});

    case LocationActions.APPLY_FILTER:
      return Object.assign({}, state, {
        locations: filter(state.rawLocations, state.filter),
      });
  }
  
  return state;
};

function filter(list: ILocation[], substr): ILocation[] {
  return list.filter((item)=> {
    return item.name.includes(substr);
  })
}