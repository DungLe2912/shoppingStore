import * as types from '../constants/ActionTypes';

const initialState = 0;

const quantityModalProduct = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_QUANTITY:
      // eslint-disable-next-line no-param-reassign
      state = action.quantity;
      return state;
    default:
      return state;
  }
};
export default quantityModalProduct;
