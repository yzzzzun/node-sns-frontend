import { all, fork, takeLatest, put, delay } from "redux-saga/effects";
import axios from "axios";

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
  LOG_OUT_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS
} from "../reducers/user";

function loginAPI(data) {
  //실제 서버 요청
  return axios.post("/api/login", data);
}
function logoutAPI() {
  //실제 서버 요청
  return axios.post("/api/logout");
}

function signupAPI(data) {
  return axios.post("/api/signup", data);
}

function* logIn(action) {
  console.log("saga-login");
  try {
    yield delay(1000);
    // const result = yield call(loginAPI, action.data);
    yield put({ type: LOG_IN_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: LOG_IN_FAILURE, error: error.response.data });
  }
}

function* logOut(action) {
  try {
    // const result = yield call(logoutAPI);
    yield delay(1000);
    yield put({ type: LOG_OUT_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: LOG_OUT_FAILURE, error: error.response.data });
  }
}

function* signUp(action) {
  try {
    //const result = yield call(signupAPI)
    yield delay(1000);
    yield put({ type: SIGNUP_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, error: error.response.data });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn); //로그인 액션이 실행될때까지 기다리겠다.
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}
export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchSignUp)]);
}
