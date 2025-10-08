import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type TRootState } from "@app/store";
import { K_E_Y_S } from "@shared/config/constants";

export type TApiKeys = {
  newsApiOrg: string;
  guardianNews: string;
  nyTimes: string;
};

const initialState: { apiKeys: TApiKeys } = {
  apiKeys: K_E_Y_S,
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


