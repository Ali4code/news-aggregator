import { store } from "@app/store";

/**
 * Helper to execute RTK Query endpoints imperatively
 * Wraps the dispatch with proper typing
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeQuery = async (endpoint: any): Promise<any> => {
  const dispatchAny = store.dispatch as unknown as (arg: any) => Promise<any> | any;
  const result = await dispatchAny(endpoint);
  return result;
};

