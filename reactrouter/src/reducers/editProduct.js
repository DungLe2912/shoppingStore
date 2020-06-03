import * as types from '../constants/ActionTypes';

const initialState = {};

const editproduct = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INFOR_EDIT_PRODUCT:
      // eslint-disable-next-line no-param-reassign
      state = action.product;
      return state;
    default:
      return state;
  }
};
export default editproduct;
