import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { StoreModule } from '../store/module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationListBodyComponent } from './location-list/location-list-body/location-list-body.component';
import { LocationListControllerComponent } from './location-list/location-list-controller/location-list-controller.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LocationListComponent,
    LocationListBodyComponent,
    LocationListControllerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgReduxModule,
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }