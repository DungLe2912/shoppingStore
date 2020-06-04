/* eslint-disable no-param-reassign */
import * as types from '../constants/ActionTypes';

const initialState = {};

const Login = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_AUTH:
      // eslint-disable-next-line no-param-reassign
      state = action.accounts;
      return state;
    case types.SIGN_IN:
      if (action.status === 200) {
        localStorage.setItem('TOKEN', JSON.stringify(action.token));
      }
      state = action;
      return state;
    case types.LOGOUT:
      localStorage.removeItem('TOKEN');
      return state;
    default:
      return state;
  }
};
export default Login;
