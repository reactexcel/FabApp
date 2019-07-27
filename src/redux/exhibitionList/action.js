import * as actions from '../actions';
import fireAjax from '../../services/index';
import { call, put } from "redux-saga/effects";

export function* exhibitionListRequest(action) {
    try {
      const response = yield call(
        fireAjax,
        "GET",
        'listitem',
        ''
      );
      if (response) {
          yield put(actions.exhibitionListSuccess());
      }
    } catch (e) {
      yield put(actions.exhibitionListError());
    }
  }