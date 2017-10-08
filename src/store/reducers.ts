import { IAppState } from './model';
import { LocationAction, LocationActions } from './actions';


export const rootReducer = function(state: IAppState, action: LocationAction): IAppState{
  console.log(action);
  switch (action.type) {
    case LocationActions.ADD_LOCATION:
      return Object.assign({}, state, {
        locations: [...state.locations, action.payload]
      });

    case LocationActions.DELETE_LOCATION:
      if (state.selected === -1) {
        return state;
      }

      const newLocations = Array.from(state.locations);
      newLocations.splice(state.selected, 1);
      return Object.assign({}, {
        locations: newLocations,
        selected: -1
      });

    case LocationActions.PICK_LOCATION:
      return Object.assign({}, state, { selected: action.payload});
  }
  return state;
};
