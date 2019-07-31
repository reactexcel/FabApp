import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constants';

const initialState = {
   user:{
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage:"",
    data:"",
   },
   createExhibition:{
    isLoading: false,
    isError: false,
    isSuccess: false,
    data:[]
   },
   userProfile:{
      isLoading: false,
      isError: false,
      isSuccess: false,
      data:''
     },
     updateProfile:{
      isLoading: false,
      isError: false,
      isSuccess: false,
      status:''
     }
};

const userRegistrationRequest = (state, action) =>{
    return(
 update(state, {
    user:{
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
     errorMessage:{ $set: "" },
    }
 }))};

const userRegistrationSuccess = (state, action) =>
 update(state, {
    user:{
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     errorMessage:{ $set: "" },
     data: { $set: action.payload }
    }
 });

 const userRegistrationError = (state, action) =>
 update(state, {
    user:{
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     errorMessage:{ $set: "Something went wrong, Please try again" } ,
     data: { $set: action.payload }
    }
 });

 const createExhibitionRequest = (state, action) =>{
    return(
 update(state, {
    createExhibition:{
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
     errorMessage:{ $set: "" },
    }
 }))};

const createExhibitionSuccess = (state, action) =>
 update(state, {
    createExhibition:{
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     errorMessage:{ $set: "" },
     data: { $set: action.payload }
    }
 });

 const createExhibitionError = (state, action) =>
 update(state, {
    createExhibition:{
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     errorMessage:{ $set: "Something went wrong, Please try again" } ,
     data: { $set: action.payload }
    }
 });

 const userProfileRequest = (state, action) =>{
   return(
update(state, {
   userProfile:{
    isLoading: { $set: true },
    isError: { $set: false },
    isSuccess: { $set: false },
    errorMessage:{ $set: "" },
   }
}))};

const userProfileSuccess = (state, action) =>
update(state, {
   userProfile:{
    isLoading: { $set: false },
    isError: { $set: false },
    isSuccess: { $set: true },
    errorMessage:{ $set: "" },
    data: { $set: action.payload }
   }
});

const userProfileError = (state, action) =>
update(state, {
   userProfile:{
    isLoading: { $set: false },
    isError: { $set: true },
    isSuccess: { $set: false },
    errorMessage:{ $set: "Something went wrong, Please try again" } ,
    data: { $set: action.payload }
   }
});

const updateProfileRequest = (state, action) =>{
   return(
update(state, {
   updateProfile:{
    isLoading: { $set: true },
    isError: { $set: false },
    isSuccess: { $set: false },
    errorMessage:{ $set: "" },
   }
}))};

const updateProfileSuccess = (state, action) =>
update(state, {
   updateProfile:{
    isLoading: { $set: false },
    isError: { $set: false },
    isSuccess: { $set: true },
    errorMessage:{ $set: "" },
    data: { $set: action.payload }
   }
});

const updateProfileError = (state, action) =>
update(state, {
   updateProfile:{
    isLoading: { $set: false },
    isError: { $set: true },
    isSuccess: { $set: false },
    errorMessage:{ $set: "Something went wrong, Please try again" } ,
    data: { $set: action.payload }
   }
});
 
export default handleActions(
 {
   [constants.USER_REGISTRATION_REQUEST]: userRegistrationRequest,
   [constants.USER_REGISTRATION_SUCCESS]: userRegistrationSuccess,
   [constants.USER_REGISTRATION_ERROR]: userRegistrationError,

   [constants.CREATE_EXHIBITION_REQUEST]: createExhibitionRequest,
   [constants.CREATE_EXHIBITION_SUCCESS]: createExhibitionSuccess,
   [constants.CREATE_EXHIBITION_ERROR]: createExhibitionError,


   [constants.USER_PROFILE_REQUEST]: userProfileRequest,
   [constants.USER_PROFILE_SUCCESS]: userProfileSuccess,
   [constants.USER_PROFILE_ERROR]: userProfileError,

   [constants.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
   [constants.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
   [constants.UPDATE_PROFILE_ERROR]: updateProfileError
 },
 initialState
);