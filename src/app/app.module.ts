import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '../store/module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ButtonComponent } from './button/button.component';
import { ListComponent } from './list/list.component';
import { ListBodyComponent } from './list/list-body/list-body.component';
import { ListControllerComponent } from './list/list-controller/list-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ButtonComponent,
    ListComponent,
    ListBodyComponent,
    ListControllerComponent
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
