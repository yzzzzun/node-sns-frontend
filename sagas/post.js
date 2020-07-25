import {
  put,
  delay,
  all,
  fork,
  takeLatest,
  actionChannel
} from "redux-saga/effects";
import axios from "axios";
import shortid from "shortid";

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

//yield를 붙이는 이유는 테스트하기 편해서!!

function addPostAPI(data) {
  //실제 서버 요청
  return axios.post("/api/post", data);
}

function addCommentAPI(data) {
  return axios.post("/api/comment", data);
}

function removePostAPI(data) {
  return axios.delete("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI);
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: { id: id, content: action.data }
    });
    //saga는 돋시에 여러 action을 dispatch 할 수 있다.
    yield put({ type: ADD_POST_TO_ME, data: id });
  } catch (error) {
    yield put({ type: ADD_POST_FAILURE, data: error.response.data });
  }
}

function* addComment(action) {
  try {
    //const result = yield call(addCOmmentAPI);
    yield delay(1000);
    yield put({ type: ADD_COMMENT_SUCCESS, data: action.data });
  } catch (error) {
    yield put({ type: ADD_COMMENT_FAILURE, data: error.resposne.data });
  }
}

function* removePost(action) {
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    });
  } catch (error) {
    yield put({ type: REMOVE_POST_FAILURE, data: error.response.data });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
