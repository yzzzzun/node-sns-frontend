import { put, delay, all, fork, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST
} from "../reducers/post";

//yield를 붙이는 이유는 테스트하기 편해서!!

function addPostAPI() {
  //실제 서버 요청
  return axios.post("/api/post");
}

function addCommentAPI() {
  return axios.post("/api/comment");
}

function* addPost() {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);
    yield put({ type: ADD_POST_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: ADD_POST_FAILURE, data: error.response.data });
  }
}

function* addComment() {
  try {
    //const result = yield call(addCOmmentAPI);
    yield delay(1000);
    yield put({ type: ADD_COMMENT_SUCCESS, data: result.data });
  } catch (error) {
    yield put({ type: ADD_COMMENT_FAILURE, data: error.resposne.data });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
