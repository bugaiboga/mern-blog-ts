import { IUser } from "./TAuth";

export interface IComment {
  text: String;
  postId: string;
  creator: IUser;
  _id: string;
}
export interface ICommentData {
  text: string;
  postId: string;
}
