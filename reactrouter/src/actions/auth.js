import * as types from '../constants/ActionTypes';
import callAPI from '../utils/APICaller';
import { signin, inforUser, register } from '../constants/api';
import { defaultHeader } from '../constants/Config';
import errorCode from '../constants/errCode';

export const signIn = (status, data, err) => ({
  type: types.SIGN_IN,
  status,
  data,
  err,
});
export const signInRequest = (account) => (dispatch) => callAPI(`${signin}`, 'POST', defaultHeader, account)
  .then((res) => {
    if (res.err === errorCode.ECONNREFUSED) {
      dispatch(signIn(null, null, errorCode.ECONNREFUSED));
    } else {
      dispatch(signIn(res.status, res.data, null));
    }
  }).catch(() => {
  //  dispatch(handleError(error));
  });

export const SignUp = (status, data, err) => ({
  type: types.SIGN_IN,
  err,
  data,
  status,
});
export const signUpRequest = (account) => (dispatch) => callAPI(`${register}`, 'POST', defaultHeader, account)
  .then((res) => {
    if (res.err === errorCode.ECONNREFUSED) {
      dispatch(SignUp(null, errorCode.ECONNREFUSED));
    } else {
      dispatch(SignUp(res.status, res.data, null));
    }
  }).catch(() => {
    //  dispatch(handleError(error));
  });
export const getInfor = (status, data) => ({
  type: types.GET_INFOR,
  status,
  data,
});
export const getInforRequest = (headerRequest) => (dispatch) => callAPI(`${inforUser}`, 'GET', headerRequest, null)
  .then((res) => {
    dispatch(getInfor(res.status, res.data));
  }).catch(() => {
  });
