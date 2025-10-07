import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BaseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://",
    fetchFn: async (input, init) => await window.fetch(input, init),
  }),
  endpoints: () => ({}),
  reducerPath: "BaseApi",
});


