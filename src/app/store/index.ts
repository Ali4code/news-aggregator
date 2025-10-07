import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { BaseApi } from "@app/api/baseApi";
import { AuthSlice } from "@app/store/slices/authSlice";
import { TabsSlice } from "@app/store/slices/tabsSlice";

const middleware = (getDefaultMiddleware: () => Middleware[]) =>
  getDefaultMiddleware().concat(BaseApi.middleware);

const reducer = {
  [BaseApi.reducerPath]: BaseApi.reducer,
  [AuthSlice.name]: AuthSlice.reducer,
  [TabsSlice.name]: TabsSlice.reducer,
};

const config = {
  reducer,
  middleware,
};

// @ts-expect-error next-line
export const store = configureStore(config);

export type TAppDispatch = typeof store.dispatch;

export type TRootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => TAppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;


