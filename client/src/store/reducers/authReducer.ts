import { Reducer } from "redux";
import { AuthActionTypes, IAuthAction, IAuthState } from "../../types/TAuth";

const initialState: IAuthState = {
  user: null,
  loading: false,
  errorAuth: null,
};

const authReducer: Reducer<IAuthState, IAuthAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return {
        ...state,
        user: action.payload,
        loading: false,
        errorAuth: null,
      };
    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        errorAuth: action.payload,
      };
    case AuthActionTypes.SET_LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errorAuth: null };
    default:
      return state;
  }
};

export default authReducer;
