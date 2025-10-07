import { describe, it, expect, beforeEach, vi } from "vitest";
import { TabsSlice, setActionSelectedTab } from "./tabsSlice";
import type { TTab } from "@widgets/navbar/Navbar.types";

const reducer = TabsSlice.reducer;

describe("tabsSlice", () => {
  const mockStorage: Record<string, string> = {};

  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => mockStorage[k] ?? null,
      setItem: (k: string, v: string) => (mockStorage[k] = v),
      removeItem: (k: string) => delete mockStorage[k],
      clear: () => Object.keys(mockStorage).forEach((k) => delete mockStorage[k]),
      key: (i: number) => Object.keys(mockStorage)[i] ?? null,
      length: 0,
    });
    Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
  });

  it("sets selected tab via setActionSelectedTab", () => {
    const initialState = reducer(undefined, { type: "@@INIT" });

    const nextTab = "home" as TTab;
    const next = reducer(initialState, setActionSelectedTab({ selectedTab: nextTab }));
    expect(next.selectedTab).toEqual(nextTab);
  });
});



