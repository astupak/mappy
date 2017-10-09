import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skip';
import { NgRedux, select } from '@angular-redux/store';
import { LocationActions } from '../../store/actions';
import { ILocation } from '../../location/model';
import { IAppState } from '../../store/model';

import { IMarker } from './marker.model';

import { Map, LatLng, Icon, Marker, tileLayer } from "leaflet";
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
      iconSize: [38, 38],
    });

    this.pickedIcon = new Icon({
      iconUrl: 'http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-Picture.png',
      iconSize: [38, 38],
    });
  }

  ngOnInit() {
    this.initMap();
    this.setMarkers();

    this.selected.subscribe((id) => {
      this.toggleMarker(id);
    });

    this.locations.skip(1).subscribe(() => {
      this.resetMarkers();
    });
  }

  initMap() {

    this.mapElement = new Map('map', { zoomControl: false });

    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.mapElement);

    this.mapElement.setView([0,0],1);
  }

  pickLocation(id: number) {
    this.ngRedux.dispatch(LocationActions.pickLocation(id));
  }

  setMarkers() {
    const locations = this.ngRedux.getState().locations;

    for (let location of locations) {
      this.addMarker(location);
    }
  }

  addMarker(location: ILocation) {
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

  toggleMarker(id: number) {
    if (this.pickedMarker) {
        this.pickedMarker.marker.setIcon(this.commonIcon);
    }

    if (id != -1) {      
      let pickedMarker = this.mapMarkers.find((item) => item.id == id);

      if (pickedMarker) { 
        this.pickedMarker = pickedMarker;
        this.pickedMarker.marker.setIcon(this.pickedIcon);
        this.mapElement.setView(this.pickedMarker.marker.getLatLng(), 5);
      }
    } else {
      this.pickedMarker = null;
    }
  }

  removeMarker() {
    this.mapMarkers.splice(this.mapMarkers.findIndex((item) => item.id == this.pickedMarker.id), 1);
    this.pickedMarker.marker.remove();
    this.pickedMarker = null;
  }

  resetMarkers() {
    const selected = this.ngRedux.getState().selected;

    this.clearMap();
    this.setMarkers();

    this.toggleMarker(selected);
  }

  clearMap() {
    const selected = this.ngRedux.getState().selected;

    for (let location of this.mapMarkers) {
      location.marker.remove();
    }

    this.mapMarkers = [];
    this.pickedMarker = null;
  }
}
