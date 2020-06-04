/* eslint-disable no-param-reassign */
import * as types from '../constants/ActionTypes';

const initialState = {};

const Error = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INFOR:
      state = action.infor;
      return state;
    default:
      return state;
  }
};
export default Error;
