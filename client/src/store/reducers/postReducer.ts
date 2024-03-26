import { Reducer } from "redux";

import { IPostActions, IPostState, PostActionTypes } from "../../types/TPost";

const initialState: IPostState = {
  postLoading: true,
  posts: [],
};

const postReducer: Reducer<IPostState, IPostActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PostActionTypes.SET_LOADING:
      return {
        ...state,
        postLoading: action.payload,
      };
    case PostActionTypes.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    default:
      return state;
  }
};

export default postReducer;
