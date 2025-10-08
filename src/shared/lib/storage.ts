export type TWebpageState = Record<string, unknown> & {
  selectedTab?: unknown;
};

const safeParseJson = <T>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

export const readFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined" || !("localStorage" in window)) return null;
  return safeParseJson<T>(window.localStorage.getItem(key));
};

export const writeToLocalStorage = (key: string, value: unknown): void => {
  if (typeof window === "undefined" || !("localStorage" in window)) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Swallow to avoid throwing during serialization/storage quota issues
  }
};


