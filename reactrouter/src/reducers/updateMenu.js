/* eslint-disable no-param-reassign */
import * as types from '../constants/ActionTypes';

const data = JSON.parse(localStorage.getItem('USER'));
const initialState = !!data;

const UpdateMenu = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INFOR:
      if (action.status === 200) {
        state = true;
      }

      return state;
    case types.LOGOUT:
      // eslint-disable-next-line no-param-reassign
      state = false;
      // eslint-disable-next-line no-console
      console.log(state);
      return state;
    default:
      return state;
  }
};
export default UpdateMenu;
