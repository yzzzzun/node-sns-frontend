//서버개발자와 합의를 봐야할 부분들
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "yzzzzun"
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://gimg.gilbut.co.kr/book/BN002496/rn_view_BN002496.jpg"
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN002496/rn_view_BN002496.jpg"
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN002496/rn_view_BN002496.jpg"
        }
      ],
      Comments: [
        {
          User: {
            nickname: "hero"
          },
          content: "저거 내꺼"
        },
        {
          User: {
            nickname: "zeze"
          },
          content: "키듴키듴"
        }
      ]
    }
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const addPost = data => {
  type: ADD_POST_REQUEST, data;
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: "yzzzzun"
  },
  content: "두 번째 게시글 #해시태그 #익스프레스",
  Images: [
    {
      src:
        "https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    }
  ],
  Comments: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostError: action.error
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostError: action.error
      };
    default:
      return state;
  }
};

export default reducer;
