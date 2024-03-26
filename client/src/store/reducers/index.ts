import { combineReducers } from "redux";

import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import postReducer from "./postReducer";

export const reducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  postsData: postReducer,
});

export type ReducersState = ReturnType<typeof reducers>;
