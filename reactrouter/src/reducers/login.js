import * as types from '../constants/ActionTypes';

const initialState = [];

const Login = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_AUTH:
      // eslint-disable-next-line no-param-reassign
      state = action.accounts;
      return state;
    case types.LOGIN:
      localStorage.setItem('USER', JSON.stringify(action.account));
      return [...state];
    case types.LOGOUT:
      localStorage.removeItem('USER');
      return [...state];
    default:
      return state;
  }
};
export default Login;
