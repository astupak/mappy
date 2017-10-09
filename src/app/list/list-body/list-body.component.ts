import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { LocationActions } from '../../../store/actions';
import { ILocation } from '../../../location/model';
import { IAppState } from '../../../store/model';

@Component({
  selector: 'app-list-body',
  templateUrl: './list-body.component.html',
  styleUrls: ['list-body.component.css']
})

export class ListBodyComponent {
  @select('locations') readonly locations: Observable<ILocation[]>;
  @select('selected') readonly selected: Observable<number>;

  buttonText: string = 'Delete';

  constructor(private ngRedux: NgRedux<IAppState>) { }

  pickLocation(index) {
    const id = this.ngRedux.getState().locations[index].id;
    this.ngRedux.dispatch(LocationActions.pickLocation(id));
  }

  deleteLocation(index) {
    this.pickLocation(index);
    this.ngRedux.dispatch(LocationActions.deleteLocation());
  }
}
