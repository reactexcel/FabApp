import * as actions from '../actions';
import fireAjax from '../../services/index';
import { call, put } from "redux-saga/effects";

//action to userlogin
export function* userLoginRequest(action) {
    try {
      const response = yield call(
        fireAjax,
        "POST",
        'login',
        '',
        action.payload
      );
      if (response) {
          yield put(actions.userLoginSuccess(response.data));
      }
    } catch (e) {
        if(e.response){
            yield put(actions.userLoginError(e.response.data.msg));
        }else if(e.message && e.message ==="Network Error"){
            yield put(actions.userLoginError(e.message));
        }
    }
  }