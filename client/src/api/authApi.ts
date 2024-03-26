import jwtDecode from "jwt-decode";

import API from "./index";
import { IUserSignInForm, IUserSignUpForm } from "../types/TAuth";

export const signIn = async (formData: IUserSignInForm) => {
  const { data } = await API.post("/auth/signin", formData);
  localStorage.setItem("token", data.token);

  return jwtDecode(data.token);
};

export const signUp = async (formData: IUserSignUpForm) => {
  const { data } = await API.post("/auth/signup", formData);

  localStorage.setItem("token", data.token);

  return jwtDecode(data.token);
};

export const auth = async () => {
  try {
    const { data } = await API.get("/auth/auth");

    localStorage.setItem("token", data.token);

    return jwtDecode(data.token);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
