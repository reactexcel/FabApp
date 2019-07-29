import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constants';

const initialState = {
   exhibiton:{
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage:"",
    exhibitions:[],
   },
   product:{
    isLoading: false,
    isError: false,
    isSuccess: false,
    products:[]
   }
};

const exhibitionListRequest = (state, action) =>{
    return(
 update(state, {
    exhibiton:{
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
     errorMessage:{ $set: "" },
    }
 }))};

const exhibitionListSuccess = (state, action) =>
 update(state, {
    exhibiton:{
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     errorMessage:{ $set: "" },
     exhibitions: { $set: action.payload }
    }
 });

 const exhibitionListError = (state, action) =>
 update(state, {
    exhibiton:{
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     errorMessage:{ $set: "Something went wrong, Please try again" } ,
     exhibitions: { $set: action.payload }
    }
 });

 const productListRequest = (state, action) =>{
    return(
 update(state, {
    product:{
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
     errorMessage:{ $set: "" },
     products:{$set:[]}
    }
 }))};

const productListSuccess = (state, action) =>
 update(state, {
     product:{
        isLoading: { $set: false },
        isError: { $set: false },
        isSuccess: { $set: true },
        errorMessage:{ $set: "" },
        products: { $set: action.payload }
    }
 });

 const productListError = (state, action) =>
 update(state, {
    product:{
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     errorMessage:{ $set: "Something went wrong, Please try again" } ,
     products: { $set: action.payload }
    }
 });
export default handleActions(
 {
   [constants.EXHIBITION_LIST_REQUEST]: exhibitionListRequest,
   [constants.EXHIBITION_LIST_SUCCESS]: exhibitionListSuccess,
   [constants.EXHIBITION_LIST_ERROR]: exhibitionListError,

   [constants.PRODUCT_LIST_REQUEST]: productListRequest,
   [constants.PRODUCT_LIST_SUCCESS]: productListSuccess,
   [constants.PRODUCT_LIST_ERROR]: productListError
 },
 initialState
);