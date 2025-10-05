import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type TRootState } from "./store";
import { WEBPAGE_STATE_LOCAL_STORAGE_KEY } from "../constants";
import { TTab } from "../components/Navbar/Navbar.types";

const selectedTabFromStorage = JSON.parse(
  localStorage.getItem(WEBPAGE_STATE_LOCAL_STORAGE_KEY) ?? "{}"
)?.selectedTab;

const initialState: { selectedTab: TTab } = {
  selectedTab: selectedTabFromStorage,
};

export const TabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setActionSelectedTab: (
      state,
      { payload }: PayloadAction<{ selectedTab: TTab }>
    ) => {
      const { selectedTab } = payload;
      state.selectedTab = selectedTab;
    },
  },
});
export const { setActionSelectedTab } = TabsSlice.actions;

export const selectSelectedTab = (state: TRootState) => state.tabs?.selectedTab as TTab
