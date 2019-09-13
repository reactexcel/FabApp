import {createAction} from 'redux-actions';
import * as constants from './constants';

//actions to get exhibitions list
export const exhibitionListRequest= createAction(constants.EXHIBITION_LIST_REQUEST);
export const exhibitionListSuccess = createAction(constants.EXHIBITION_LIST_SUCCESS);
export const exhibitionListError = createAction(constants.EXHIBITION_LIST_ERROR);

//actions to get products list
export const productListRequest= createAction(constants.PRODUCT_LIST_REQUEST);
export const productListSuccess = createAction(constants.PRODUCT_LIST_SUCCESS);
export const productListError = createAction(constants.PRODUCT_LIST_ERROR);

//actions to register a user(exhibitor/fabricator) 
export const userRegistrationRequest= createAction(constants.USER_REGISTRATION_REQUEST);
export const userRegistrationSuccess = createAction(constants.USER_REGISTRATION_SUCCESS);
export const userRegistrationError = createAction(constants.USER_REGISTRATION_ERROR);

//actions to create a exhibition
export const createExhibitionRequest= createAction(constants.CREATE_EXHIBITION_REQUEST);
export const createExhibitionSuccess = createAction(constants.CREATE_EXHIBITION_SUCCESS);
export const createExhibitionError = createAction(constants.CREATE_EXHIBITION_ERROR);

//actions to get profile(exhibitor/fabricator)
export const userProfileRequest= createAction(constants.USER_PROFILE_REQUEST);
export const userProfileSuccess = createAction(constants.USER_PROFILE_SUCCESS);
export const userProfileError = createAction(constants.USER_PROFILE_ERROR);

//actions to update profile(exhibitor/fabricator)
export const updateProfileRequest= createAction(constants.UPDATE_PROFILE_REQUEST);
export const updateProfileSuccess = createAction(constants.UPDATE_PROFILE_SUCCESS);
export const updateProfileError = createAction(constants.UPDATE_PROFILE_ERROR);

//actions to get  profile(exhibitor/fabricator) after update
export const userProfileAfterUpdateRequest= createAction(constants.USER_PROFILE_AFTER_UPDATE_REQUEST);
export const userProfileAfterUpdateSuccess = createAction(constants.USER_PROFILE_AFTER_UPDATE_SUCCESS);

//actions to clear  update reducer
export const clearUpdateRequest= createAction(constants.CLEAR_UPDATE_REQUEST);
export const clearUpdateSuccess = createAction(constants.CLEAR_UPDATE_SUCCESS);

//actions to clear  user profile reducer
export const clearUserProfileRequest= createAction(constants.CLEAR_USERPROFILE_REQUEST);
export const clearUserProfileSuccess = createAction(constants.CLEAR_USERPROFILE_SUCCESS);

//actions to upload portfolio(fabricator)
export const uploadPortfolioequest= createAction(constants.UPLOAD_PORTFOLIO_REQUEST);
export const uploadPortfolioSuccess = createAction(constants.UPLOAD_PORTFOLIO_SUCCESS);
export const uploadPortfolioError = createAction(constants.UPLOAD_PORTFOLIO_ERROR);

//actions to upload portfolio(fabricator)
export const deletePortfolioequest= createAction(constants.DELETE_PORTFOLIO_REQUEST);
export const deletePortfolioSuccess = createAction(constants.DELETE_PORTFOLIO_SUCCESS);
export const deletePortfolioError = createAction(constants.DELETE_PORTFOLIO_ERROR);

//actions to get fabricator's list
export const fabricatorListRequest= createAction(constants.FABRICATOR_LIST_REQUEST);
export const fabricatorListSuccess = createAction(constants.FABRICATOR_LIST_SUCCESS);
export const fabricatorListError = createAction(constants.FABRICATOR_LIST_ERROR);

//actions to clear fabricator's list
export const clearFabricatorListRequest= createAction(constants.CLEAR_FABRICATOR_LIST_REQUEST);
export const clearFabricatorListSuccess = createAction(constants.CLEAR_FABRICATOR_LIST_SUCCESS);

//actions to add fabricator to quote by exhibitor
export const addFabricatorRequest= createAction(constants.ADD_FABRICATOR_REQUEST);
export const addFabricatorSuccess = createAction(constants.ADD_FABRICATOR_SUCCESS);
export const addFabricatorError = createAction(constants.ADD_FABRICATOR_ERROR);

//actions to userlogin
export const userLoginRequest= createAction(constants.USER_LOGIN_REQUEST);
export const userLoginSuccess = createAction(constants.USER_LOGIN_SUCCESS);
export const userLoginError = createAction(constants.USER_LOGIN_ERROR);

//actions for messaging
export const chatMessageRequest= createAction(constants.CHAT_MESSAGE_REQUEST);
export const chatMessageSuccess = createAction(constants.CHAT_MESSAGE_SUCCESS);
export const chatMessageError = createAction(constants.CHAT_MESSAGE_ERROR);