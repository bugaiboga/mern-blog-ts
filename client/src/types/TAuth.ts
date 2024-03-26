export enum AuthActionTypes {
  SET_AUTH = "SET_AUTH",
  SET_LOADING = "SET_LOADING",
  SET_LOGOUT = "SET_LOGOUT",
  SET_ERROR = "SET_ERROR",
}

export interface IUserSignInForm {
  email: string;
  password: string;
}
export interface IAuthError {
  message: string;
  typeError: string;
}

export interface IUserSignUpForm extends IUserSignInForm {
  email: string;
  username: string;
  password: string;
  repassword: string;
}
export interface IUser {
  email: string;
  _id: string;
  username: string;
  avatar: string;
}

export interface IAuthState {
  user: IUser | null;
  loading: boolean;
  errorAuth: IAuthError | null;
}

interface IActionAuth {
  type: AuthActionTypes.SET_AUTH;
  payload: IUser;
}
interface IActionAuthLoading {
  type: AuthActionTypes.SET_LOADING;
  payload: boolean;
}
interface IActionLogout {
  type: AuthActionTypes.SET_LOGOUT;
  payload?: null;
}
interface IActionAuthError {
  type: AuthActionTypes.SET_ERROR;
  payload: IAuthError | null;
}
export type IAuthAction =
  | IActionAuth
  | IActionLogout
  | IActionAuthError
  | IActionAuthLoading;
