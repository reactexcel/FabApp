import * as actions from '../actions';
import fireAjax from '../../services/index';
import { call, put } from "redux-saga/effects";

export function* exhibitionListRequest(action) {
    try {
      const response = yield call(
        fireAjax,
        "GET",
        'listexhbiton',
      );

      if (response) {
          yield put(actions.exhibitionListSuccess(response.data));
      }
    } catch (e) {
      // console.log(e.message,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      
      yield put(actions.exhibitionListError());
    }
  }

  export function* productListRequest(action) {
    try {
      const response = yield call(
        fireAjax,
        "GET",
        'listitem',
      );

      if (response) {
          yield put(actions.productListSuccess(response.data));
      }
    } catch (e) {
      // console.log(e.message,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      
      yield put(actions.productListError());
    }
  }