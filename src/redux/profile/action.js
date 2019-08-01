import * as actions from '../actions';
import fireAjax from '../../services/index';
import { call, put } from "redux-saga/effects";

//action to create profile of user(fabricator/exhibitor)
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
      yield put(actions.userRegistrationError());
    }
  }

  //action to create a quote proforming by exhibitor
  export function* createExhibitionRequest(action) {
    const header = {
        "Authorization":`Token ${action.payload.userToken}`,
        "Content-Type": "application/json"
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
          if(e.response){
          yield put(actions.createExhibitionError(e.response));
          }
          else if(e.message){
            yield put(actions.createExhibitionError("Network error"));
        }else{
          yield put(actions.createExhibitionError());
        }
    }
}

//action to get user(exhibitor/fabricator)'s profile
export function* userProfileRequest(action) {
const header = {
    "Authorization":`Token ${action.payload.userToken}`
  };
try {
  const response = yield call(
    fireAjax,
    "GET",
    'profile',
    header,
    ''
  );

  if (response) {
      yield put(actions.userProfileSuccess(response.data));
  }
} catch (e) {
    if(e.response){
    yield put(actions.userProfileError(e.response));
    }
    else if(e.message){
      yield put(actions.userProfileError("Network error"));
    }else{
      yield put(actions.userProfileError());
    }
  }
}
//action to get user(exhibitor/fabricator)'s profile after update
export function* userProfileAfterUpdateRequest(action) {
  const header = {
      "Authorization":`Token ${action.payload.userToken}`
    };
  try {
    const response = yield call(
      fireAjax,
      "GET",
      'profile',
      header,
      ''
    );
  
    if (response) {
        yield put(actions.userProfileAfterUpdateSuccess(response.data));
    }
  } catch (e) {
      
    }
  }

//action to update (exhibitor/fabricator)'s profile
export function* updateProfileRequest(action) {
const header = {
    "Authorization":`Token ${action.payload.userToken}`
  };
try {
  const response = yield call(
    fireAjax,
    "PUT",
    `profile/${action.payload.id}`,
    header,
    action.payload.data
  );

  if (response) {
      yield put(actions.updateProfileSuccess(response.data));
  }
} catch (e) {
    if(e.response){
    yield put(actions.updateProfileError(e.response.data));
    }
    else if(e.message){
      yield put(actions.updateProfileError("Network error"));
    }else{
      yield put(actions.updateProfileError());
    }
  }
}

//action to clear the update reducer
export function* clearUpdateReducerRequest(action) {
  try {
        yield put(actions.clearUpdateSuccess());
  } catch (e) {

    }
  }

  //action to clear the update reducer
export function* clearUserProfileReducerRequest(action) {
  try {
        yield put(actions.clearUserProfileSuccess());
  } catch (e) {

    }
  }

  export function* uploadPotfolioRequest(action) {
    const header = {
        "Authorization":`Token ${action.payload.userToken}`
      };
    try {
      const response = yield call(
        fireAjax,
        "PUT",
        'portfolio',
        header,
        action.payload.data
      );
    
      if (response) {
          yield put(actions.uploadPortfolioSuccess(response.data));
      }
    } catch (e) {
        if(e.response){
        yield put(actions.uploadPortfolioError(e.response.data));
        }
        else if(e.message){
          yield put(actions.uploadPortfolioError("Network error"));
        }else{
          yield put(actions.uploadPortfolioError());
        }
      }
    }