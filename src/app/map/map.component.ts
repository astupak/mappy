import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { LocationActions } from '../../store/actions';
import { ILocation } from '../../location/model';
import { IAppState } from '../../store/model';

import { map, tileLayer, popup, marker, LatLng, Icon } from "leaflet";
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'style-loader!css-loader!leaflet/dist/leaflet.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['map.component.css']
})

export class MapComponent implements OnInit {
  @select('locations') readonly locations: Observable<ILocation[]>;
  @select('selected') readonly selected: Observable<number>;

  constructor(private ngRedux: NgRedux<IAppState>) {
    console.log(this.ngRedux.getState().locations)
  }

  ngOnInit() {
    //leaflet could not find marker images for some reason
    
    Icon.Default.imagePath = ' ';
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    const mapElement = map('map', { zoomControl: false })
      .setView([51.505, -0.09], 13);

    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mapElement);

    let location = this.ngRedux.getState().locations[0].latLng;
    marker(new LatLng(location[0], location[1])).addTo(mapElement);
    mapElement.setView([location[0], location[1]], 13);


  }

  pickLocation(index) {
    this.ngRedux.dispatch(LocationActions.pickLocation(index));
  }
}

