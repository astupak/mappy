import { NgModule } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from './model';
import { rootReducer } from './reducers';

import data from '../location/locations.mock.json';

@NgModule({})
export class StoreModule {
  constructor (public store: NgRedux<IAppState>) {
    
    store.configureStore( rootReducer, {
     locations: data.locations,
     selected: -1,
    });
  }
}