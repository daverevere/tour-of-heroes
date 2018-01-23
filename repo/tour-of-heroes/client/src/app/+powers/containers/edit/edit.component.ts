import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
//this is a 'lettable' operator
import { map, switchMap, tap, first } from 'rxjs/operators';
import { Power } from '../../../core/models/power.model';
import { PowersService } from '../../../core/services/powers.service';
import { getSelectedPower, PowersState, getPowersTotal } from '../../../state/powers/reducers/index';
import { LoadPower, SelectPower, UpdatePower } from '../../../state/powers/actions/powers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  power: Observable<Power>;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<PowersState>, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.power = this.activatedRoute.paramMap
    // the pipe property on observable takes however many arguments you want to use from the observable
      .pipe(
        tap(paramMap => this.store.dispatch(new SelectPower({id: Number(paramMap.get('id'))}))),
        tap(paramMap => {
          this.hasPowersInStore()
            .subscribe( exists => {
              if(!exists) {
                this.store.dispatch(new LoadPower({id: Number(paramMap.get('id'))}))
              }
            })
        }),
        //switchmap completes the outer observable(paramMap), recieves the emitted value and returns the inner observable out to this.power
        switchMap(()=> this.store.select(getSelectedPower))
      )
  }

  hasPowersInStore(): Observable<boolean> {
    return this.store.select(getPowersTotal)
      .pipe(
        first(),
        map(total => total > 0)
      )
  }

  onPowerChange(power: Power) {
    this.store.dispatch(new UpdatePower(power));
  }

}
