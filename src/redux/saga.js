import { takeLatest, takeEvery ,all } from "redux-saga/effects";
import * as constants from "./constants";
import {exhibitionListRequest,productListRequest,fabricatorListRequest,addFabricatorRequest,clearFabricatorListRequest} from "./exhibitionList/action";
import {userRegistrationRequest,updateProfileRequest,createExhibitionRequest,userProfileRequest,userProfileAfterUpdateRequest,clearUpdateReducerRequest,clearUserProfileReducerRequest,uploadPotfolioRequest,deletePotfolioRequest} from "./profile/action";
import {userLoginRequest} from "./auth/action";
import {chatMessageRequest} from "./chat/action";
export function* watchActions() {
  yield takeLatest(constants.EXHIBITION_LIST_REQUEST, exhibitionListRequest);
  yield takeLatest(constants.PRODUCT_LIST_REQUEST, productListRequest);
  yield takeLatest(constants.USER_REGISTRATION_REQUEST, userRegistrationRequest);
  yield takeLatest(constants.CREATE_EXHIBITION_REQUEST, createExhibitionRequest);
  yield takeLatest(constants.USER_PROFILE_REQUEST, userProfileRequest);
  yield takeLatest(constants.UPDATE_PROFILE_REQUEST, updateProfileRequest);
  yield takeLatest(constants.USER_PROFILE_AFTER_UPDATE_REQUEST, userProfileAfterUpdateRequest);
  yield takeLatest(constants.CLEAR_UPDATE_REQUEST, clearUpdateReducerRequest);
  yield takeLatest(constants.CLEAR_USERPROFILE_REQUEST, clearUserProfileReducerRequest);
  yield takeLatest(constants.UPLOAD_PORTFOLIO_REQUEST, uploadPotfolioRequest);
  yield takeLatest(constants.DELETE_PORTFOLIO_REQUEST, deletePotfolioRequest);
  yield takeLatest(constants.FABRICATOR_LIST_REQUEST, fabricatorListRequest);
  yield takeLatest(constants.ADD_FABRICATOR_REQUEST, addFabricatorRequest);
  yield takeLatest(constants.CLEAR_FABRICATOR_LIST_REQUEST, clearFabricatorListRequest);
  yield takeLatest(constants.USER_LOGIN_REQUEST, userLoginRequest);
  yield takeLatest(constants.CHAT_MESSAGE_REQUEST, chatMessageRequest);
}

export default function* rootSaga() {
  yield all([watchActions()]);
}