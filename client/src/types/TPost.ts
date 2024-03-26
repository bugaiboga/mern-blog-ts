import { IUser } from "./TAuth";
import { ICategory } from "./TCategory";

export interface IPostFormData {
  title: string;
  description: string;
  file: File;
  category: string;
}
export interface IPost {
  title: string;
  description: string;
  imageUrl: string;
  category: ICategory;
  creator: IUser;
  likes: Map<string, string>;
  _id: string;
  createdAt: string;
}

export enum PostActionTypes {
  FETCH_POSTS = "FETCH_POSTS",
  SET_LOADING = "SET_LOADING",
}

export interface IPostState {
  postLoading: boolean;
  posts: IPost[] | [];
  currentPage?: number;
  numberOfPages?: number;
}

interface IActionPostSetLoading {
  type: PostActionTypes.SET_LOADING;
  payload: boolean;
}
interface IActionFethPosts {
  type: PostActionTypes.FETCH_POSTS;
  payload: {
    posts: IPost[];
    currentPage: number;
    numberOfPages: number;
  };
}

export type IPostActions = IActionFethPosts | IActionPostSetLoading;
