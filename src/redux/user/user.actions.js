import {UserActionTypes} from './user.types';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const logoutUser = user => ({
  type: UserActionTypes.LOGOUT_USER,
  payload: user
});

