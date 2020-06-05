/* eslint-disable no-param-reassign */
import * as types from '../constants/ActionTypes';

const initialState = {};

const SignUp = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP:
      state = action;
      return state;
    default:
      return state;
  }
};
export default SignUp;
