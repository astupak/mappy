import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LocationActions } from '../../../store/actions';
import { IAppState } from '../../../store/model';
import { LatLng } from 'leaflet';


@Component({
  selector: 'app-location-list-controller',
  templateUrl: './location-list-controller.component.html',
  styleUrls: ['location-list-controller.component.css']
})

export class LocationListControllerComponent {
  
  locationName: string = 'Location';
  latitude: number = 55.0;
  longitude: number = 12.0;

  constructor(private ngRedux: NgRedux<IAppState>) {
    console.log(this.ngRedux.getState().locations)
  }

  addLocation() {
    this.ngRedux.dispatch(LocationActions.addLocation({
      name: this.locationName,
      latLng: [Math.round(this.latitude * 100)/100, Math.round(this.longitude*100)/100],
    }))
  }

}

