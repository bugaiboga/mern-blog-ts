import API from "./index";

export const getCategories = async () => {
  const { data } = await API.get("/category");

  return data;
};
