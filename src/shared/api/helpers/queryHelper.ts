import { store } from "@app/store";

/**
 * Helper to execute RTK Query endpoints imperatively
 * Wraps the dispatch with proper typing
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeQuery = async (endpoint: any): Promise<any> => {
  // @ts-expect-error - RTK Query dispatch signature mismatch
  const result = await store.dispatch(endpoint);
  return result;
};

