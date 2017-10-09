import { IAppState } from './model';
import { LocationAction, LocationActions } from './actions';
import { ILocation } from '../location/model';


export const rootReducer = function(state: IAppState, action: LocationAction): IAppState{
  switch (action.type) {
    case LocationActions.ADD_LOCATION:

      let newLocation = Object.assign({}, action.payload, { id: state._id });
      let rawLocations = [ ...state.rawLocations, newLocation ];

      return Object.assign({}, state, {
        rawLocations,
        locations: filter(rawLocations, state.filter),
        _id: state._id+1,
      });

    case LocationActions.DELETE_LOCATION:

      if (state.selected === -1) {
        return state;
      }
      
      return Object.assign({}, state, {
        rawLocations: removeById(state.rawLocations, state.selected),
        locations: removeById(state.locations, state.selected),
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

function removeById(list: ILocation[], id: number) :ILocation[] {
  const newList = Array.from(list);
  const index = newList.findIndex((item) => item.id == id);

  newList.splice(index, 1);

  return newList;
}