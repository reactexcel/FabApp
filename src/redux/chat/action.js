import * as actions from '../actions';
import fireAjax from '../../services/index';
import { call, put } from "redux-saga/effects";

//action to userlogin
export function* chatMessageRequest(action) { 
    console.log(action,'actionaction');
    
    const header = {
        "Authorization":`Token ${action.payload.userToken}`,
        "Content-Type": "application/json"
      };   
    try {
      const response = yield call(
        fireAjax,
        "GET",
        `chat/${action.payload.user_id}`,
        header,
        // ''
        action.payload.message
      );
      if (response) {
          yield put(actions.chatMessageSuccess(response.data));
      }
    } catch (e) {
        if(e.response){
            yield put(actions.chatMessageError(e.response.data.msg));
        }else if(e.message && e.message ==="Network Error"){
            yield put(actions.chatMessageError(e.message));
        }
    }
  }

  //action to userlogin
// export function* chatMessageRequest(action) { 
//     console.log(action,'actionaction');
    
//     const header = {
//         "Authorization":`Token ${action.payload.userToken}`,
//         "Content-Type": "application/json"
//       };   
//     try {
//       const response = yield call(
//         fireAjax,
//         "GET",
//         `chat/${action.payload.user_id}`,
//         header,
//         ''
//         // action.payload.message
//       );
//       if (response) {
//           yield put(actions.chatMessageSuccess(response.data));
//       }
//     } catch (e) {
//         if(e.response){
//             yield put(actions.chatMessageError(e.response.data.msg));
//         }else if(e.message && e.message ==="Network Error"){
//             yield put(actions.chatMessageError(e.message));
//         }
//     }
//   }