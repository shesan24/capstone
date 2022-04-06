import {SET_TOKEN, SET_USER_DATA, UPDATE_ACTIVE_TRANSACTION} from './constants';

const initialState = {
  token: null,
  userData: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, token: action.payload};
    case SET_USER_DATA:
      return {...state, userData: action.payload};
    case UPDATE_ACTIVE_TRANSACTION:
      return {
        ...state,
        userData: {...state.userData, activeTransaction: action.payload},
      };
    default:
      return state;
  }
}

export default userReducer;
