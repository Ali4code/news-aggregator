import {
  TNewYorTimesRequest,
  TNewYorTimesResponse,
} from "./NewYorkTimes.types";
import { BaseApi } from "../../store/store";

export const TheNewYorkTimesApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchNewYorkTimes: builder.query<
      TNewYorTimesResponse,
      TNewYorTimesRequest
    >({
      query: ({ apiKey, searchParam, from, to, category }) => ({
        url:
          `api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}` +
          (from ? `&begin_date=${from}` : "") +
          (to ? `&end_date=${to}` : "") +
          (searchParam ? `&q=${searchParam}` : "") +
          (category ? `&fq=section_name:(${category})` : ""),
      }),
    }),
  }),
});

export const { useLazySearchNewYorkTimesQuery, useSearchNewYorkTimesQuery } = TheNewYorkTimesApi;
