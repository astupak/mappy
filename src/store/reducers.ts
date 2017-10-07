import { IAppState } from './model';
import {LocationAction, LocationActions} from './actions';


export const rootReducer = function(state: IAppState, action: LocationAction): IAppState{
  switch (action.type) {
    case LocationActions.ADD_LOCATION:
    case LocationActions.DELETE_LOCATION:
    case LocationActions.PICK_LOCATION:
      console.log(state, action);
      break;
  }
  return state;
};
