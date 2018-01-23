import { Injectable } from '@angular/core';
import { PowersService } from '../../../core/services/powers.service';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import {
  DELETE_POWER,
  UPDATE_POWER,
  LOAD_POWERS,
  DeletePower,
  DeletePowerSuccess,
  LoadPowersSuccess,
  UpdatePower,
  UpdatePowerSuccess, LOAD_POWER, LoadPowerSuccess, LoadPower
} from '../actions/powers';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class PowersEffects {

  @Effect()
    //filter action of type load powers, it's an observable which emits an observable of the action, action has a properyt type and payload, when that emits we're going to use switchMap to return a new observable
    //powersservice.getpwoers emits an array of power objects, we don't use switcmap at the end because this is returning an action not an observable,
  loadPowers: Observable<Action> = this.actions.ofType(LOAD_POWERS)
    .pipe(
      switchMap(() => this.powersService.getPowers()),
      map(powers => new LoadPowersSuccess(powers))
    );

  @Effect()
  loadPower: Observable<Action> = this.actions.ofType<LoadPower>(LOAD_POWER)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.powersService.getPower(payload.id)),
      map(power => new LoadPowerSuccess(power))
    );

  @Effect()
  deletePower: Observable<Action> = this.actions.ofType<DeletePower>(DELETE_POWER)
    .pipe(
      map((action: DeletePower) => action.payload),
      switchMap(power => this.powersService.deletePower(power)),
      map((power) => new DeletePowerSuccess(power))
    );

  @Effect()
  updatePower: Observable<Action> = this.actions.ofType<UpdatePower>(UPDATE_POWER)
    .pipe(
      map((action: UpdatePower) => action.payload),
      switchMap(power => this.powersService.updatePower(power)),
      map((power) => new UpdatePowerSuccess(power))
    );

  constructor(private powersService: PowersService, private actions: Actions) {

  }

}
