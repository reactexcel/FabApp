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

  //action to get fabricator's list as per exhibition
export function* fabricatorListRequest(action) {
  // const header = {
  //     "Authorization":`Token ${action.payload.userToken}`
  //   };
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `fabricators/${action.payload.id}`,
      '',
      ''
    );
  
    if (response) {
        yield put(actions.fabricatorListSuccess(response.data));
    }
  } catch (e) {
    if(e.response){
      yield put(actions.fabricatorListError(e.response.data));
      }
      else if(e.message){
        yield put(actions.fabricatorListError("Network error"));
      }else{
        yield put(actions.fabricatorListError());
      }
    }
  }

    //action to add fabricator to quote by exhibior
export function* addFabricatorRequest(action) {
  const header = {
      "Authorization":`Token ${action.payload.userToken}`
    };
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `create_bid/${action.payload.fabId}/${action.payload.exhibitionId}`,
      header,
      ''
    );
  
    if (response) {
        yield put(actions.addFabricatorSuccess(response.data));
    }
  } catch (e) {
    if(e.response){
      yield put(actions.addFabricatorError(e.response.data));
      }
      else if(e.message){
        yield put(actions.addFabricatorError("Network error"));
      }else{
        yield put(actions.addFabricatorError());
      }
    }
  }