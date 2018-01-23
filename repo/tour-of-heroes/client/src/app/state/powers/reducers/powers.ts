import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Power } from '../../../core/models/power.model';
import {
  DELETE_POWER_SUCCESS, LOAD_POWER_SUCCESS, LOAD_POWERS, LOAD_POWERS_SUCCESS, PowersAction, SELECT_POWER,
  UPDATE_POWER_SUCCESS
} from '../actions/powers';

//entity state gives us id and entities
//entities a dictionary where the keys are the entityID
export interface State extends EntityState<Power> {
  selectedPowerId: number;

}

export const adapter: EntityAdapter<Power> = createEntityAdapter();

export const initialState: State = adapter.getInitialState({
  selectedPowerId: null
});

//reducer is a pure function
export function reducer(state: State = initialState, action: PowersAction) {
  switch (action.type) {
    case SELECT_POWER:
      return {...state, selectedPowerId: action.payload.id};
    case LOAD_POWER_SUCCESS:
      return adapter.addOne(action.payload, state);
    case UPDATE_POWER_SUCCESS:
      return adapter.updateOne({
        id: action.payload.id,
        changes: action.payload
      }, state);
    case DELETE_POWER_SUCCESS:
      return adapter.removeOne(action.payload.id, state);
    case LOAD_POWERS_SUCCESS:
      return adapter.addMany([...action.payload].sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      }), state);
    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectedPowerId;
