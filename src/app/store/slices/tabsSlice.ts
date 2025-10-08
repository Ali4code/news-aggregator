import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type TRootState } from "@app/store";
import { TTab } from "@widgets/navbar/Navbar.types";

const initialState: { selectedTab: TTab } = {
  selectedTab: undefined as unknown as TTab,
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


