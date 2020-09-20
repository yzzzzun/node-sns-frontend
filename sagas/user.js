import { all, call, fork, takeLatest, put, delay } from "redux-saga/effects";
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
  SIGNUP_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE
} from "../reducers/user";

function loginAPI(data) {
  return axios.post("/users/login", data);
}
function logoutAPI() {
  //실제 서버 요청
  return axios.post("/users/logout");
}

function signupAPI(data) {
  return axios.post("/users",data);
}

function followAPI(data) {
  return axios.post("todo");
}

function unFollowAPI(data) {
  return axios.post("todo");
}

function* logIn(action) {
  console.log("saga-login");
  try {
    const result = yield call(loginAPI, action.data);
    yield put({ type: LOG_IN_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: LOG_IN_FAILURE, error: error.response.data });
  }
}

function* logOut(action) {
  try {
    yield call(logoutAPI);
    yield put({ type: LOG_OUT_SUCCESS});
  } catch (error) {
    yield put({ type: LOG_OUT_FAILURE, error: error.response.data });
  }
}

function* signUp(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log(result);
    yield put({ type: SIGNUP_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, error: error.response.data });
  }
}

function* follow(action) {
  try {
    //const result = yield call(signupAPI)
    yield delay(1000);
    yield put({ type: FOLLOW_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: FOLLOW_FAILURE, error: error.response.data });
  }
}

function* unFollow(action) {
  try {
    //const result = yield call(signupAPI)
    yield delay(1000);
    yield put({ type: UNFOLLOW_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: UNFOLLOW_FAILURE, error: error.response.data });
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

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow)
  ]);
}
