/** 변경중, 완료, 오류 */
export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: false,
  logOutLoading: false,
  logOutDone: false,
  logOutError: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: false,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: false,
  me: null,
  signUpData: {},
  loginData: {}
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

export const loginRequest = data => {
  console.log("reducer login");
  return {
    type: LOG_IN_REQUEST,
    data
  };
};

export const logoutRequest = () => {
  return {
    type: LOG_OUT_REQUEST
  };
};
const dummyUser = data => ({
  ...data,
  nickname: "yzzzzun",
  id: 1,
  Posts: [{ id: 1 }], // sequalizer 에서 합쳐주기때문에 대문자
  Followings: [
    { nickname: "araru" },
    { nickname: "아라루" },
    { nickname: "tams" }
  ],
  Followers: [
    { nickname: "araru" },
    { nickname: "아라루" },
    { nickname: "tams" }
  ]
});
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        loginError: null,
        logInDone: false
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data)
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: false,
        me: null
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: false
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error
      };
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: false
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error
      };
    case ADD_POST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts]
        }
      };
    case REMOVE_POST_OF_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter(v => v.id !== action.data)
        }
      };
    default:
      return state;
  }
};

export default reducer;
