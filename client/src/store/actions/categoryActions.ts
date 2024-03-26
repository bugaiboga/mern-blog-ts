import { Dispatch } from "redux";

import * as api from "../../api/categoryApi";
import { CategoryActionTypes, ICategoryActions } from "../../types/TCategory";

export const getCategoriesAction =
  () => (dispatch: Dispatch<ICategoryActions>) => {
    api
      .getCategories()
      .then((data) => {
        dispatch({
          type: CategoryActionTypes.SET_LOADING_CATEGORY,
          payload: true,
        });
        dispatch({
          type: CategoryActionTypes.SET_CATEGORY,
          payload: data.categories,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: CategoryActionTypes.SET_LOADING_CATEGORY,
          payload: false,
        });
      });
  };
