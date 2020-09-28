import { all, fork } from "redux-saga/effects";

import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;
/**
 * 동기로 수행
 * while(true){
 *  take("action", apiCall)
 * }
 *
 * 비동기로 수행
 * takeEvery("action", apiCall)
 *
 * takeLatest 마지막 요청만
 * takeLeading 첫번쨰 요청만
 *
 * 응답을 취소하지 요청을 취소하는건 아님 -> backend에서 두번요청들어왔을떄 제거해주는 처리가 필요함
 * throttle("action", apiCall, 2000) 2초안에 요청이 여러번들어가면 요청까지 취소한다. -> 특수한 상황에서만 사용함 (요청이 너무많이가서 DDOS 공격처럼 될거같으면)
 *
 * throttle vs debounce
 */

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]); //fork or all 차이 : fork는 비동기 call 동기
}
