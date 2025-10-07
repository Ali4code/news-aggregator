import {
  TGuardianResponse,
  TSearchGuardianRequest,
} from "./TheGuardian.types";
import { BaseApi } from "@app/api/baseApi";

export const TheGuardianApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchGuardian: builder.query<TGuardianResponse, TSearchGuardianRequest>({
      query: ({ apiKey, searchParam, from, to, category }) => ({
        url:
          `content.guardianapis.com/search?api-key=${apiKey}&show-fields=all` +
          (from ? `&from-date=${from}` : "") +
          (to ? `&to-date=${to}` : "") +
          (searchParam ? `&q=${searchParam}` : "") +
          (category ? `&section=${category}` : ""),
      }),
    }),
  }),
});

export const { useSearchGuardianQuery, useLazySearchGuardianQuery } =
  TheGuardianApi;


