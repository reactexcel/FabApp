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