/* eslint-disable no-param-reassign */
import * as types from '../constants/ActionTypes';

const initialState = {};

const Verify = (state = initialState, action) => {
  switch (action.type) {
    case types.VERIFY_CODE:
      state = action;
      return state;
    default:
      return state;
  }
};
export default Verify;
