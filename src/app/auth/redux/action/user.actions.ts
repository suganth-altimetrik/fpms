import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { UserState } from '../reducer/user.reducer';

export const userLogin = createAction('login', (user: UserState) => user);
