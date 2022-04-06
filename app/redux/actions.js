import {SET_TOKEN, SET_USER_DATA, UPDATE_ACTIVE_TRANSACTION} from './constants';

export const setToken = token => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const setUserData = userData => dispatch => {
  dispatch({
    type: SET_USER_DATA,
    payload: userData,
  });
};

export const updateActiveTransaction = transaction => dispatch => {
  dispatch({
    type: UPDATE_ACTIVE_TRANSACTION,
    payload: transaction,
  });
};
