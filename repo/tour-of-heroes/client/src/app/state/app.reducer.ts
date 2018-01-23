import { ActionReducer, ActionReducerMap, MetaReducer, State } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from "../../environments/environment";
import { AppState } from './app.interfaces';

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log("state", state);
    console.log("action", action);
    return reducer(state, action);
  };
}

//allows us to add global reducer functions
export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  :[];


//how to add redux
//add ngrx store and router-store
