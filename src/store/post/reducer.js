
import { ACT_FETCH_ARTICLES_LATEST, ACT_FETCH_ARTICLES_PAGING, ACT_FETCH_ARTICLES_POPULAR, ACT_FETCH_DETAIL_PAGE, ACT_FETCH_POST_RELATED } from './actions';


const initState = {
  postsLatest: [],
  postsPopular: [],
  postsPaging: {
    list: [],
    currentPage: 1,
    totalPage: 1
  },
  postRelated: {
    list: []
  },
  postDetail: [],
  postSearch: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case ACT_FETCH_ARTICLES_LATEST:
      return {
        ...state,
        postsLatest: action.payload,
      };
    case ACT_FETCH_ARTICLES_POPULAR:
      return {
        ...state,
        postsPopular: action.payload,
      };
    case ACT_FETCH_ARTICLES_PAGING:
      return {
        ...state,
        postsPaging: {
          ...state.postsPaging,
          currentPage: action.payload.currentPage,
          totalPage: action.payload.totalPage,
          list: action.payload.currentPage === 1 ? action.payload.posts : [...state.postsPaging.list, ...action.payload.posts]
        },
      };
    case ACT_FETCH_POST_RELATED:
      return {
        ...state,
        postRelated: {
          ...state.postRelated,
          list: [...action.payload.posts]
        }
      }
    case ACT_FETCH_DETAIL_PAGE:
      return {
        ...state,
        postDetail: action.payload.posts,
      };
    default:
      return state;
  }
}
export default reducer;


