import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";
const initialState = {
  user: {},
  post: {}
};

//{이전상태, 액션} => 다음 상태
const rootReducer = combineReducers({
  //hydrate 리듀서 redux ssr을 위해 추가
  index: (state = {}, action) => {
    switch (action.type) {
      case "HYDRATE":
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post
});

export default rootReducer;
