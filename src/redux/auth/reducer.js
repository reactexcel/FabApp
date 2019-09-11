import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constants';

const initialState = {
   userLogin:{
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage:"",
    data:"",
   },
}

const userLoginRequest = (state, action) =>{
    return(
 update(state, {
    userLogin:{
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
     errorMessage:{ $set: "" },
    }
 }))};

const userLoginSuccess = (state, action) =>
 update(state, {
    userLogin:{
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     errorMessage:{ $set: "" },
     data: { $set: action.payload }
    }
 });

 const userLoginError = (state, action) =>
 update(state, {
    userLogin:{
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     errorMessage:{ $set:action.payload  } ,
     data: { $set: action.payload }
    }
 });

 export default handleActions(
    {
      [constants.USER_LOGIN_REQUEST]: userLoginRequest,
      [constants.USER_LOGIN_SUCCESS]: userLoginSuccess,
      [constants.USER_LOGIN_ERROR]: userLoginError,
      
    },
    initialState
   );