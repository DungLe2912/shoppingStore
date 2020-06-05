/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import * as types from '../constants/ActionTypes';

const data = JSON.parse(localStorage.getItem('USER'));
const initialState = data || {};

const InforUser = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INFOR:
      const status = { status: action.status };
      localStorage.setItem('USER', JSON.stringify(action.data));
      state = { ...action.data, ...status };
      return state;
    default:
      return state;
  }
};
export default InforUser;
