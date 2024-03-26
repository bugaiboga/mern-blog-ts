import { Reducer } from "redux";

import {
  CategoryActionTypes,
  ICategoryActions,
  ICategoryState,
} from "../../types/TCategory";

const initialState: ICategoryState = {
  categories: null,
  categoryLoading: false,
};

const categoryReducer: Reducer<ICategoryState, ICategoryActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CategoryActionTypes.SET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case CategoryActionTypes.SET_LOADING_CATEGORY:
      return {
        ...state,
        categoryLoading: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
