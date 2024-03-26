import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ReducersState } from "../store/reducers/index";

export const useTypedSelector: TypedUseSelectorHook<ReducersState> =
  useSelector;
