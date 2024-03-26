import API from "./index";

import { IPost, IPostFormData } from "../types/TPost";

export const createPostApi = (newPost: IPostFormData) => {
  const formData = new FormData();

  formData.append("title", newPost.title);
  formData.append("description", newPost.description);

  if (newPost.file) {
    formData.append("file", newPost.file);
  }

  formData.append("category", newPost.category);

  return new Promise<IPost>((resolve, reject) => {
    API.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        const { data } = response;
        const typedData = data as IPost;
        resolve(typedData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPostApi = (id: string) => {
  return new Promise<IPost>((resolve, reject) => {
    API.get(`/posts/post/${id}`)
      .then((response) => {
        const postData: IPost = response.data;
        resolve(postData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchPosts = (page: number) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (page: number, search: string) =>
  API.get(`/posts/search?page=${page}&?searchQuery=${search}`);
