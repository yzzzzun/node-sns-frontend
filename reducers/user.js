export const initialState = {
  logInLoading: false,
  logInDone: false, // login 시도중
  logInError: false, //logout 시도중
  logOutLoading: false,
  logOutDone: false, // logout 시도중
  logOutError: false, //logout 시도중
  signUpLoading: false,
  signUpDone: false, // logout 시도중
  signUpError: false, //logout 시도중
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

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

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
  Posts: [], // sequalizer 에서 합쳐주기때문에 대문자
  Followings: [],
  Followers: []
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
    case SIGNUP_SUCCESS:
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
    default:
      return state;
  }
};

export default reducer;
