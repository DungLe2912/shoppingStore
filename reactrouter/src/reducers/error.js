import * as types from '../constants/ActionTypes';

const initialState = '';

const Error = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_ERROR:

      // eslint-disable-next-line no-param-reassign
      state = 'Lỗi kết nối tới server';
      return state;
    default:
      return state;
  }
};
export default Error;
