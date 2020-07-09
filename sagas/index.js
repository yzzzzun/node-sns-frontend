import {
  all,
  fork,
  call,
  take,
  put,
  takeEvery,
  delay,
  takeLatest
} from "redux-saga/effects";

function loginAPI(data) {
  //실제 서버 요청
  return axios.post("/api/login", data);
}
function logoutAPI() {
  //실제 서버 요청
  return axios.post("/api/logout");
}
function addPostAPI() {
  //실제 서버 요청
  return axios.post("/api/post");
}
//yield를 붙이는 이유는 테스트하기 편해서!!
function* logIn(action) {
  try {
    yield delay(2000);
    // const result = yield call(loginAPI, action.data);
    yield put({ type: "LOG_IN_SUCCESS", data: result.data });
  } catch (error) {
    yield put({ type: "LOG_IN_FAILURE", data: error.response.data });
  }
}

function* logOut() {
  try {
    // const result = yield call(logoutAPI);
    yield delay(2000);
    yield put({ type: "LOG_OUT_SUCCESS", data: result.data });
  } catch (error) {
    yield put({ type: "LOG_OUT_FAILURE", data: error.response.data });
  }
}

function* addPost() {
  try {
    // const result = yield call(addPostAPI);
    yield delay(2000);
    yield put({ type: "ADD_POST_SUCCESS", data: result.data });
  } catch (error) {
    yield put({ type: "ADD_POST_FAILURE", data: error.response.data });
  }
}

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

function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", logIn); //로그인 액션이 실행될때까지 기다리겠다.
}
function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}
function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchAddPost)]); //fork or all 차이 : fork는 비동기 call 동기
}
