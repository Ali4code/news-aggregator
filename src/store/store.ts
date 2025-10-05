import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthSlice } from "./authSlice";
import { TabsSlice } from "./tabsSlice";

export const BaseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://",
    fetchFn: async (input, init) => await window.fetch(input, init),
  }),
  endpoints: () => ({}),
  reducerPath: "BaseApi",
});

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
