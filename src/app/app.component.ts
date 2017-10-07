import { Component, OnInit } from '@angular/core';
import { IAppState } from "../store/model";
import { NgRedux } from "@angular-redux/store";
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-root',
  template: `
    <div>
    </div>
  `,
})

export class AppComponent implements OnInit {

  constructor(private ngRedux: NgRedux<IAppState>, ) { }

  ngOnInit() {
  }
}