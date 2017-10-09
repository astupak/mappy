import { IAppState } from './model';
import { LocationAction, LocationActions } from './actions';


export const rootReducer = function(state: IAppState, action: LocationAction): IAppState{
  switch (action.type) {
    case LocationActions.ADD_LOCATION:

      let newLocation = Object.assign({}, action.payload, { id: state._id });

      return Object.assign({}, state, {
        locations: [ ...state.locations, newLocation ],
        _id: state._id+1,
      });

    case LocationActions.DELETE_LOCATION:

      if (state.selected === -1) {
        return state;
      }

      const newLocations = Array.from(state.locations);
      const index = newLocations.findIndex((item) => item.id == state.selected);


      newLocations.splice(index, 1);
      
      return Object.assign({}, state, {
        locations: newLocations,
        selected: -1
      });

    case LocationActions.PICK_LOCATION:

      return Object.assign({}, state, { selected: action.payload});
  }
  
  return state;
};
