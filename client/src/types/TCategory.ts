export enum CategoryActionTypes {
  SET_CATEGORY = "SET_CATEGORY",
  SET_LOADING_CATEGORY = "SET_LOADING_CATEGORY",
}

export interface ICategory {
  name: string;
  _id: string;
}

export interface ICategoryState {
  categories: ICategory[] | [] | null;
  categoryLoading: boolean;
}

interface ICategoryActionGet {
  type: CategoryActionTypes.SET_CATEGORY;
  payload: ICategory[] | null;
}
interface ICategoryActionLoading {
  type: CategoryActionTypes.SET_LOADING_CATEGORY;
  payload: boolean;
}

export type ICategoryActions = ICategoryActionGet | ICategoryActionLoading;
