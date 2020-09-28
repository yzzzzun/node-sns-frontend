import {
  put,
  delay,
  all,
  fork,
  takeLatest,
  throttle,
  call,
} from "redux-saga/effects";
import axios from "axios";

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  generateDummyPost,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

//yield를 붙이는 이유는 테스트하기 편해서!!

//실제 서버 요청
function addPostAPI(data) {
  console.log("posts api call");
  return axios.post("/posts", { content: data });
}

function addCommentAPI(data) {
  return axios.post(`/posts/${data.postId}/comment`, data);
}

function removePostAPI(data) {
  return axios.delete("/posts", data);
}

function loadPostAPI() {
  return axios.get("/posts");
}

function* addPost(action) {
  try {
    console.log("add post saga function");
    console.log(action);
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    //saga는 돋시에 여러 action을 dispatch 할 수 있다.
    yield put({ type: ADD_POST_TO_ME, data: result.data.id });
  } catch (error) {
    console.log(error);
    yield put({ type: ADD_POST_FAILURE, data: error.response.data });
  }
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI);
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
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    yield put({ type: REMOVE_POST_FAILURE, data: error.response.data });
  }
}

function* loadPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_POSTS_FAILURE, data: error.response.data });
  }
}

function* watchLoadPost() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPost);
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
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
  ]);
}
