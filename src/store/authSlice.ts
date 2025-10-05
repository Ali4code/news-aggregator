import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type TRootState } from "./store";
import { API_KEYS_LOCAL_STORAGE_KEY, K_E_Y_S } from "../constants";

export type TApiKeys = {
  newsApiOrg: string;
  guardianNews: string;
  nyTimes: string;
};

const apiKeysFromStorage = JSON.parse(
  localStorage.getItem(API_KEYS_LOCAL_STORAGE_KEY) ?? "null"
);
const initialState: { apiKeys: TApiKeys } = {
  apiKeys: apiKeysFromStorage ?? K_E_Y_S,
};

export const AuthSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setActionApiKeys: (
      state,
      { payload }: PayloadAction<{ apiKeys: TApiKeys }>
    ) => {
      const { apiKeys } = payload;
      state.apiKeys = apiKeys;
    },
  },
});
export const { setActionApiKeys } = AuthSlice.actions;

export const selectApiKeys = (state: TRootState) => state.api?.apiKeys as TApiKeys;
