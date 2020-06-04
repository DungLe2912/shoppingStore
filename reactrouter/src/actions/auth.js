import * as types from '../constants/ActionTypes';
import callAPI from '../utils/APICaller';
import handleError from './index';
import { signin } from '../constants/api';
import { defaultHeader } from '../constants/Config';

export const signIn = (status, message, token) => ({
  type: types.SIGN_IN,
  status,
  message,
  token,
});
export const signInRequest = (account) => (dispatch) => callAPI(`${signin}`, 'POST', defaultHeader, account)
  .then((res) => {
    dispatch(signIn(res.status, res.data.message, res.data.token));
  }).catch(() => {
  //  dispatch(handleError(error));
  });
