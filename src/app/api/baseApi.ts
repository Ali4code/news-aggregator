import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DEFAULT_REQUEST_TIMEOUT_MS = 5000;

const fetchWithTimeout = async (
  input: RequestInfo | URL,
  init?: RequestInit & { timeoutMs?: number }
) => {
  const timeoutMs = init?.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await window.fetch(input, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const BaseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://",
    fetchFn: async (input, init) => await fetchWithTimeout(input, init as RequestInit),
  }),
  endpoints: () => ({}),
  reducerPath: "BaseApi",
});


