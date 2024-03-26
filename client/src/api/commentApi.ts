import { IComment, ICommentData } from "../types/TComnent";
import API from "./index";

export const getCommentsPost = (id: string) => {
  return new Promise<IComment[] | []>((resolve, reject) => {
    API.get(`/comment/post/${id}`)
      .then((response) => {
        const { data } = response;
        const typedData = data as IComment[];
        resolve(typedData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createCommentApi = (commentData: ICommentData) => {
  return new Promise<IComment>((resolve, reject) => {
    API.post("/comment/create", commentData)
      .then((response) => {
        const { data } = response;
        const typedData = data as IComment;
        resolve(typedData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
