import { describe, it, expect, beforeEach, vi } from "vitest";
import { AuthSlice, setActionApiKeys } from "./authSlice";
import type { TApiKeys } from "./authSlice";

const reducer = AuthSlice.reducer;

describe("authSlice", () => {
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

  it("sets api keys via setActionApiKeys", () => {
    // initial state is created inside slice; we can obtain it by reducing undefined
    const initialState = reducer(undefined, { type: "@@INIT" });

    const nextKeys: TApiKeys = {
      newsApiOrg: "n",
      guardianNews: "g",
      nyTimes: "t",
    };

    const next = reducer(initialState, setActionApiKeys({ apiKeys: nextKeys }));
    expect(next.apiKeys).toEqual(nextKeys);
  });
});



