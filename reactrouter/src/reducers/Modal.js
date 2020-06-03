import * as types from '../constants/ActionTypes';

const initialState = {};

const Modal = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      // eslint-disable-next-line no-param-reassign
      state = action.product;
      return state;

    default:
      return state;
  }
};
export default Modal;
