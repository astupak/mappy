import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pairwise';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { LocationActions } from '../../store/actions';
import { ILocation } from '../../location/model';
import { IAppState } from '../../store/model';

import { Map, tileLayer, LatLng, Icon, map, Marker } from "leaflet";
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
  pickedMarkerIndex: number = -1;
  pickedMarker: Marker;
  mapMarkers: Marker[] = [];
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

   this.mapElement.setView(this.mapMarkers[0].getLatLng(),5);

   this.selected.subscribe((index) => {
     this.toggleMarker(index);
   });

   this.locations.pairwise().subscribe(([oldList, newList]) => {
     if (oldList.length > newList.length) {
       this.removeMarker();
     } else {
       console.log(newList)
       this.addMarker(newList[newList.length-1].latLng);
     }
   })

  }

  initMap() {

    this.mapElement =  map('map', { zoomControl: false });

    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.mapElement);


  }

  pickLocation(index) {
    this.ngRedux.dispatch(LocationActions.pickLocation(index));
  }

  setMarkers() {
    const locations = this.ngRedux.getState().locations;

    for (let { latLng } of locations) {
      this.addMarker(latLng);
    }
  }

  addMarker(latLng) {
    let newMarker = new Marker(new LatLng(latLng[0],latLng[1]), { icon: this.commonIcon});

    this.mapMarkers.push(newMarker);
    newMarker.addTo(this.mapElement);

    newMarker.on('click', () => {
      this.pickLocation(this.mapMarkers.indexOf(newMarker));
    })
  }

  toggleMarker(index) {
    if (index != -1) {
      if (this.pickedMarker) {
        this.pickedMarker.setIcon(this.commonIcon);
      }
      this.pickedMarkerIndex = index;
      this.pickedMarker = this.mapMarkers[index];
      this.pickedMarker.setIcon(this.pickedIcon);
      this.mapElement.setView(this.pickedMarker.getLatLng(), 5);
    }
  }

  removeMarker() {
    this.pickedMarker.remove();
    this.pickedMarker = null;
    this.mapMarkers.splice(this.pickedMarkerIndex, 1);
    this.pickedMarkerIndex = -1;
  }
}

