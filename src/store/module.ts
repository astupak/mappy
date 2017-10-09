import { NgModule } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from './model';
import { rootReducer } from './reducers';

import data from '../location/locations.mock.json';

@NgModule({})
export class StoreModule {
  constructor (public store: NgRedux<IAppState>) {
    const locations = this.parseData(data.locations);
    
    store.configureStore( rootReducer, {
      rawLocations: locations,
      locations: locations,
      selected: -1,
      filter: '',
      _id: locations.length
    });
  }

  parseData(data) {
    let id = 0;

    return data.map((item) => {
      item.id = id++;

      return item;
    });
  }
}