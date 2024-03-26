import { Dispatch } from "redux";

import * as api from "../../api/authApi";
import {
  AuthActionTypes,
  IAuthAction,
  IUser,
  IUserSignInForm,
  IUserSignUpForm,
} from "../../types/TAuth";

export const signInAction =
  (formData: IUserSignInForm) => (dispatch: Dispatch<IAuthAction>) => {
    api
      .signIn(formData)
      .then((data) => {
        dispatch({
          type: AuthActionTypes.SET_LOADING,
          payload: true,
        });
        dispatch({ type: AuthActionTypes.SET_AUTH, payload: data as IUser });
      })
      .catch((e) => {
        dispatch({
          type: AuthActionTypes.SET_ERROR,
          payload: e.response.data,
        });
      })
      .finally(() => {
        dispatch({
          type: AuthActionTypes.SET_LOADING,
          payload: false,
        });
      });
  };

export const signUpAction =
  (formData: IUserSignUpForm) => (dispatch: Dispatch<IAuthAction>) => {
    api
      .signUp(formData)
      .then((data) => {
        dispatch({
          type: AuthActionTypes.SET_LOADING,
          payload: true,
        });
        dispatch({ type: AuthActionTypes.SET_AUTH, payload: data as IUser });
      })
      .catch((e) => {
        dispatch({
          type: AuthActionTypes.SET_ERROR,
          payload: e.response.data,
        });
      })
      .finally(() => {
        dispatch({
          type: AuthActionTypes.SET_LOADING,
          payload: false,
        });
      });
  };

export const checkAuthAction = () => (dispatch: Dispatch<IAuthAction>) => {
  api
    .auth()
    .then((data) => {
      dispatch({
        type: AuthActionTypes.SET_LOADING,
        payload: true,
      });
      dispatch({ type: AuthActionTypes.SET_AUTH, payload: data as IUser });
    })
    .finally(() => {
      dispatch({
        type: AuthActionTypes.SET_LOADING,
        payload: false,
      });
    });
};
