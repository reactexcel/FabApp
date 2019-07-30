import { takeLatest, takeEvery ,all } from "redux-saga/effects";
import * as constants from "./constants";
import {exhibitionListRequest,productListRequest} from "./exhibitionList/action";
import {userRegistrationRequest,createExhibitionRequest} from "./profile/action";


export function* watchActions() {
  yield takeLatest(constants.EXHIBITION_LIST_REQUEST, exhibitionListRequest);
  yield takeLatest(constants.PRODUCT_LIST_REQUEST, productListRequest);
  yield takeLatest(constants.USER_REGISTRATION_REQUEST, userRegistrationRequest);
  yield takeLatest(constants.CREATE_EXHIBITION_REQUEST, createExhibitionRequest);
}

export default function* rootSaga() {
  yield all([watchActions()]);
}