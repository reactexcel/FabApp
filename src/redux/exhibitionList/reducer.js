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
   },
   fabList:{
      isLoading: false,
      isError: false,
      isSuccess: false,
      list:[]
     },

     addFabricator:{
      isLoading: false,
      isError: false,
      isSuccess: false,
      status:[]
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

 const fabricatorListRequest = (state, action) =>{
   return(
update(state, {
   fabList:{
    isLoading: { $set: true },
    isError: { $set: false },
    isSuccess: { $set: false },
    list:{$set:[]}
   }
}))};

const fabricatorListSuccess = (state, action) =>
update(state, {
    fabList:{
       isLoading: { $set: false },
       isError: { $set: false },
       isSuccess: { $set: true },
       list: { $set: action.payload }
   }
});

const fabricatorListError = (state, action) =>
update(state, {
   fabList:{
    isLoading: { $set: false },
    isError: { $set: true },
    isSuccess: { $set: false },
    list: { $set: action.payload }
   }
});

const addFabricatorRequest = (state, action) =>{
   return(
update(state, {
   addFabricator:{
    isLoading: { $set: true },
    isError: { $set: false },
    isSuccess: { $set: false },
    status:{$set:[]}
   }
}))};

const addFabricatorSuccess = (state, action) =>
update(state, {
    addFabricator:{
       isLoading: { $set: false },
       isError: { $set: false },
       isSuccess: { $set: true },
       status: { $set: action.payload }
   }
});

const addFabricatorError = (state, action) =>
update(state, {
   addFabricator:{
    isLoading: { $set: false },
    isError: { $set: true },
    isSuccess: { $set: false },
    status: { $set: action.payload }
   }
});
export default handleActions(
 {
   [constants.EXHIBITION_LIST_REQUEST]: exhibitionListRequest,
   [constants.EXHIBITION_LIST_SUCCESS]: exhibitionListSuccess,
   [constants.EXHIBITION_LIST_ERROR]: exhibitionListError,

   [constants.PRODUCT_LIST_REQUEST]: productListRequest,
   [constants.PRODUCT_LIST_SUCCESS]: productListSuccess,
   [constants.PRODUCT_LIST_ERROR]: productListError,

   [constants.FABRICATOR_LIST_REQUEST]: fabricatorListRequest,
   [constants.FABRICATOR_LIST_SUCCESS]: fabricatorListSuccess,
   [constants.FABRICATOR_LIST_ERROR]: fabricatorListError,

   [constants.ADD_FABRICATOR_REQUEST]: addFabricatorRequest,
   [constants.ADD_FABRICATOR_SUCCESS]: addFabricatorSuccess,
   [constants.ADD_FABRICATOR_ERROR]: addFabricatorError,
 },
 initialState
);