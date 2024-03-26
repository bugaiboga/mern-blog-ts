import { Dispatch } from "redux";

import * as api from "../../api/postApi";
import { IPostActions, PostActionTypes } from "../../types/TPost";

export const getPosts =
  (page: number) => async (dispatch: Dispatch<IPostActions>) => {
    try {
      dispatch({ type: PostActionTypes.SET_LOADING, payload: true });
      const {
        data: { posts, currentPage, numberOfPages },
      } = await api.fetchPosts(page);

      dispatch({
        type: PostActionTypes.FETCH_POSTS,
        payload: { posts, currentPage, numberOfPages },
      });

      dispatch({ type: PostActionTypes.SET_LOADING, payload: false });
    } catch (error) {
      console.log(error);
    }
  };

export const getPostsBySearch =
  (page: number, search: string) =>
  async (dispatch: Dispatch<IPostActions>) => {
    try {
      dispatch({ type: PostActionTypes.SET_LOADING, payload: true });
      const {
        data: { posts, currentPage, numberOfPages },
      } = await api.fetchPostsBySearch(page, search);

      dispatch({
        type: PostActionTypes.FETCH_POSTS,
        payload: { posts, currentPage, numberOfPages },
      });

      dispatch({ type: PostActionTypes.SET_LOADING, payload: false });
    } catch (error) {
      console.log(error);
    }
  };
