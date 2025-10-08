import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { BaseApi } from "@app/api/baseApi";
import { AuthSlice } from "@app/store/slices/authSlice";
import { TabsSlice } from "@app/store/slices/tabsSlice";
import { readFromLocalStorage } from "@shared/lib/storage";
import { API_KEYS_LOCAL_STORAGE_KEY, WEBPAGE_STATE_LOCAL_STORAGE_KEY } from "@shared/config/constants";

const middleware = (getDefaultMiddleware: () => Middleware[]) =>
  getDefaultMiddleware().concat(BaseApi.middleware);

const reducer = {
  [BaseApi.reducerPath]: BaseApi.reducer,
  [AuthSlice.name]: AuthSlice.reducer,
  [TabsSlice.name]: TabsSlice.reducer,
};

const preloadedState = (() => {
  const apiKeys = readFromLocalStorage<any>(API_KEYS_LOCAL_STORAGE_KEY);
  const webpageState = readFromLocalStorage<any>(WEBPAGE_STATE_LOCAL_STORAGE_KEY);
  const state: Record<string, unknown> = {
    [TabsSlice.name]: { selectedTab: webpageState?.selectedTab },
  };
  if (apiKeys) {
    state[AuthSlice.name] = { apiKeys };
  }
  return state;
})();

const config = {
  reducer,
  middleware,
  preloadedState,
};

// @ts-expect-error next-line
export const store = configureStore(config);

export type TAppDispatch = typeof store.dispatch;

export type TRootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => TAppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;


