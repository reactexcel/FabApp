import * as actions from '../actions';
import fireAjax from '../../services/index';
import { call, put } from "redux-saga/effects";

export function* userRegistrationRequest(action) {
    try {
      const response = yield call(
        fireAjax,
        "POST",
        'register',
        '',
        action.payload
      );

      if (response) {
          yield put(actions.userRegistrationSuccess(response.data));
      }
    } catch (e) {
      // console.log(e.message,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      
      yield put(actions.userRegistrationError());
    }
  }

  export function* createExhibitionRequest(action) {
      console.log(action);
      
    const header = {
        "Authorization":action.payload.userToken
      };
    try {
      const response = yield call(
        fireAjax,
        "POST",
        `exhibitor_request/${action.payload.exhibitionToken}`,
        header,
        action.payload.data
      );

      if (response) {
          yield put(actions.createExhibitionSuccess(response.data));
      }
    } catch (e) {
      // console.log(e.message,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      
      yield put(actions.createExhibitionError());
    }
  }