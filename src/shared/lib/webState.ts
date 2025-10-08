import { readFromLocalStorage, writeToLocalStorage } from "@shared/lib/storage";
import { WEBPAGE_STATE_LOCAL_STORAGE_KEY } from "@shared/config/constants";

export type WebState = Record<string, unknown>;

export const getWebState = <T extends WebState = WebState>(): T => {
  return (readFromLocalStorage<T>(WEBPAGE_STATE_LOCAL_STORAGE_KEY) as T) || ({} as T);
};

export const setWebState = <T extends WebState = WebState>(next: T): void => {
  writeToLocalStorage(WEBPAGE_STATE_LOCAL_STORAGE_KEY, next);
};


