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

//constants to get profile(exhibitor/fabricator)
export const userProfileRequest= createAction(constants.USER_PROFILE_REQUEST);
export const userProfileSuccess = createAction(constants.USER_PROFILE_SUCCESS);
export const userProfileError = createAction(constants.USER_PROFILE_ERROR);

//constants to update profile(exhibitor/fabricator)
export const updateProfileRequest= createAction(constants.UPDATE_PROFILE_REQUEST);
export const updateProfileSuccess = createAction(constants.UPDATE_PROFILE_SUCCESS);
export const updateProfileError = createAction(constants.UPDATE_PROFILE_ERROR);

//constants to get  profile(exhibitor/fabricator) after update
export const userProfileAfterUpdateRequest= createAction(constants.USER_PROFILE_AFTER_UPDATE_REQUEST);
export const userProfileAfterUpdateSuccess = createAction(constants.USER_PROFILE_AFTER_UPDATE_SUCCESS);

//constants to upload portfolio(fabricator)
export const uploadPortfolioequest= createAction(constants.UPLOAD_PORTFOLIO_REQUEST);
export const uploadPortfolioSuccess = createAction(constants.UPLOAD_PORTFOLIO_SUCCESS);
export const uploadPortfolioError = createAction(constants.UPLOAD_PORTFOLIO_ERROR);