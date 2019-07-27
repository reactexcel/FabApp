import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constants';

const initialState = {
   isLoading: false,
   isError: false,
   isSuccess: false,
   errorMessage:"",
   exhibitions:[]
};

const exhibitionListRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
     errorMessage:"",
 }))};

const exhibitionListSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     errorMessage:"",
     status: { $set: action.payload }
 });

 const exhibitionListError = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     errorMessage:"Something went wrong, Please try again",
     status: { $set: action.payload }
 });

export default handleActions(
 {
   [constants.EXHIBITION_LIST_REQUEST]: exhibitionListRequest,
   [constants.EXHIBITION_LIST_SUCCESS]: exhibitionListSuccess,
   [constants.EXHIBITION_LIST_ERROR]: exhibitionListError
 },
 initialState
);