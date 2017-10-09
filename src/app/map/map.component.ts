import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pairwise';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { LocationActions } from '../../store/actions';
import { ILocation } from '../../location/model';
import { IAppState } from '../../store/model';

import { IMarker } from './marker.model';

import { Map, tileLayer, LatLng, Icon, map, Marker  } from "leaflet";
import 'style-loader!css-loader!leaflet/dist/leaflet.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['map.component.css']
})

export class MapComponent implements OnInit {
  @select('locations') readonly locations: Observable<ILocation[]>;
  @select('selected') readonly selected: Observable<number>;

  mapElement: Map;
  mapMarkers: IMarker[] = [];
  pickedMarker: IMarker;
  commonIcon: Icon;
  pickedIcon: Icon;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.commonIcon = new Icon({
      iconUrl: 'http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
      iconSize: [38, 38], // size of the icon
    });

    this.pickedIcon = new Icon({
      iconUrl: 'http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-Picture.png',
      iconSize: [38, 38], // size of the icon
    });
  }

  ngOnInit() {
    this.initMap();
    this.setMarkers();

    this.mapElement.setView(this.mapMarkers[0].marker.getLatLng(),5);

    this.selected.subscribe((id) => {
      this.toggleMarker(id);
    });

    this.locations.pairwise().subscribe(([oldList, newList]) => {
      if (oldList.length > newList.length) {
        this.removeMarker();
      } else {
        this.addMarker(newList[newList.length-1]);
      }
    })
  }

  initMap() {

    this.mapElement =  map('map', { zoomControl: false });

    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.mapElement);
  }

  pickLocation(id) {
    this.ngRedux.dispatch(LocationActions.pickLocation(id));
  }

  setMarkers() {
    const locations = this.ngRedux.getState().locations;

    for (let location of locations) {
      this.addMarker(location);
    }
  }

  addMarker(location) {
    const newMarker = {
      marker: new Marker(new LatLng(location.latLng[0],location.latLng[1]), { icon: this.commonIcon}),
      id: location.id
    };

    this.mapMarkers.push(newMarker);

    newMarker.marker.addTo(this.mapElement);

    newMarker.marker.on('click', () => {
      this.pickLocation(newMarker.id);
    })
  }

  toggleMarker(id) {
    if (id != -1) {
      if (this.pickedMarker) {
        this.pickedMarker.marker.setIcon(this.commonIcon);
      }

      this.pickedMarker = this.mapMarkers.find((item) => item.id == id);
      this.pickedMarker.marker.setIcon(this.pickedIcon);
      this.mapElement.setView(this.pickedMarker.marker.getLatLng(), 5);
    }
  }

  removeMarker() {
    this.mapMarkers.splice(this.mapMarkers.findIndex((item) => item.id == this.pickedMarker.id), 1);
    this.pickedMarker.marker.remove();
    this.pickedMarker = null;
  }
}
