/* eslint-disable no-param-reassign */
import * as types from '../constants/ActionTypes';

const initialState = null;

const Login = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      if (action.status === 200) {
        localStorage.setItem('TOKEN', JSON.stringify(action.data.token));
      }
      state = action;
      return state;
    case types.LOGOUT:
      localStorage.removeItem('USER');
      localStorage.removeItem('TOKEN');
      return state;
    default:
      return state;
  }
};
export default Login;
