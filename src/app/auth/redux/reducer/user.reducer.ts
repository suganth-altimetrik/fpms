import { createReducer, on } from '@ngrx/store';
import { userLogin } from '../action/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  email: string;
  name: string;
  token: string;
  user_id: string;
}

export const initialState: UserState = {
  email: '',
  name: '',
  token: '',
  user_id: '',
};

export const reducer = createReducer(
  initialState,
  on(userLogin, (init: UserState, input: any) => {
    return { ...init, ...input };
  })
);
