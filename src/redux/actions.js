import {createAction} from 'redux-actions';
import * as constants from './constants';

//actions to get exhibitions list
export const exhibitionListRequest= createAction(constants.EXHIBITION_LIST_REQUEST);
export const exhibitionListSuccess = createAction(constants.EXHIBITION_LIST_SUCCESS);
export const exhibitionListError = createAction(constants.EXHIBITION_LIST_ERROR);