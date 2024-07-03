import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { userFeatureKey } from './user.reducer';

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

const mergeReducer = (state: any, rehydratedState: any, action: any) => {
  if (
    (action.type === INIT_ACTION || action.type === UPDATE_ACTION) &&
    rehydratedState
  ) {
    state = rehydratedState; // <-- this line was changed to not clone
  }
  return state;
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [userFeatureKey],
    rehydrate: true,
    mergeReducer, // <-- use in the config here
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];
