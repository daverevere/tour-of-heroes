import * as fromPowers from "./powers";
import { AppState } from '../../app.interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Power } from '../../../core/models/power.model';

export interface PowersState {
  powers: fromPowers.State
}

export interface State extends AppState {
  powers: PowersState
}

export const reducers = {
  powers: fromPowers.reducer
};

export const getPowersState = createFeatureSelector<PowersState>('powers');

export const getPowersEntityState = createSelector(
  getPowersState,
  (state) => state.powers
);


export const {
  selectAll: getAllPowers,
  selectEntities: getPowerEntities,
  selectIds: getPowersIds,
  selectTotal: getPowersTotal
} = fromPowers.adapter.getSelectors(getPowersEntityState);

export const getSelectedPowerId = createSelector(
  getPowersEntityState,
  fromPowers.getSelectedId
)
export const getSelectedPower = createSelector (
  getPowerEntities,
  getSelectedPowerId,
  (entities, selectedPowerId) => entities && entities[selectedPowerId]
);

//this is what a selector would like like if we wrote it on our own, but now we use
// export const getAllPowers = createSelector(
//   getPowersEntityState,
//   state => state.entities
// )
//
