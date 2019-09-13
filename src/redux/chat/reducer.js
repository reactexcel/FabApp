import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constants';

const initialState = {
   chat:{
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage:"",
    data:"",
   },
}

const chatMessageRequest = (state, action) =>{
    return(
 update(state, {
    chat:{
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
     errorMessage:{ $set: "" },
    }
 }))};

const chatMessageSuccess = (state, action) =>
 update(state, {
    chat:{
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     errorMessage:{ $set: "" },
     data: { $set: action.payload }
    }
 });

 const chatMessageError = (state, action) =>
 update(state, {
    chat:{
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     errorMessage:{ $set:action.payload  } ,
     data: { $set: action.payload }
    }
 });

 export default handleActions(
    {
      [constants.CHAT_MESSAGE_REQUEST]: chatMessageRequest,
      [constants.CHAT_MESSAGE_SUCCESS]: chatMessageSuccess,
      [constants.CHAT_MESSAGE_ERROR]: chatMessageError,
      
    },
    initialState
   );