import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PowersService } from '../../../core/services/powers.service';
import { Observable } from 'rxjs/Observable';
import { Power } from '../../../core/models/power.model';
import { AddPowerComponent } from '../../dialogs/add-power/add-power.component';
import { Store } from '@ngrx/store';
import { PowersState, getAllPowers } from '../../../state/powers/reducers/index';
import { DeletePower, LoadPowers } from '../../../state/powers/actions/powers';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  powers: Observable<Array<Power>>;

  constructor(private store: Store<PowersState>, private matDialog: MatDialog) {
  }

  ngOnInit() {
    //listening to the store
    this.powers = this.store.select(getAllPowers);

    //adding the first powers to the store
    this.store.dispatch(new LoadPowers());
  }

  onDelete(power: Power) {
    this.store.dispatch(new DeletePower(power));
  }

  onAdd() {
    this.matDialog.open(AddPowerComponent);
  }

}
