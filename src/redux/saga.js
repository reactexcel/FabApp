import { takeLatest, takeEvery ,all } from "redux-saga/effects";
import * as constants from "./constants";
import {exhibitionListRequest,productListRequest} from "./exhibitionList/action";


export function* watchActions() {
  yield takeLatest(constants.EXHIBITION_LIST_REQUEST, exhibitionListRequest);
  yield takeLatest(constants.PRODUCT_LIST_REQUEST, productListRequest);
}

export default function* rootSaga() {
  yield all([watchActions()]);
}