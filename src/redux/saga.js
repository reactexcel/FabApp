import { takeLatest, takeEvery ,all } from "redux-saga/effects";
import * as constants from "./constants"


export function* watchActions() {
  yield takeLatest();

}

export default function* rootSaga() {
  yield all([watchActions()]);
}