import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userFeatureKey } from '../reducer/user.reducer';

const userState = createFeatureSelector<UserState>(userFeatureKey);

export const userSelector = createSelector(
  userState,
  (state: UserState) => state
);
