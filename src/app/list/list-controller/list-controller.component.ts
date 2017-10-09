import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LocationActions } from '../../../store/actions';
import { IAppState } from '../../../store/model';
import { LatLng } from 'leaflet';


@Component({
  selector: 'app-list-controller',
  templateUrl: './list-controller.component.html',
  styleUrls: ['list-controller.component.css']
})

export class ListControllerComponent {
  
  filterButtonText: string = 'Filter';
  addButtonText: string = 'Add';
  locationName: string = 'Location';
  latitude: number = 55.0;
  longitude: number = 12.0;
  filter: string = '';

  constructor(private ngRedux: NgRedux<IAppState>) { }

  addLocation() {
    this.ngRedux.dispatch(LocationActions.addLocation({
      name: this.locationName,
      latLng: [Math.round(this.latitude * 100)/100, Math.round(this.longitude*100)/100],
    }))
  }

  applyFilter() {
    this.ngRedux.dispatch(LocationActions.setFilter(this.filter));
    this.ngRedux.dispatch(LocationActions.applyFilter());
  }

}

