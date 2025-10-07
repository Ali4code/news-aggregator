import {
  TNewsApiOrgResponse,
  TSearchNewsApiOrgRequest,
  TSourcesNewsApiOrgResponse,
  TTopHeadlinesNewsApiOrgRequest,
} from "./NewsApi.types";
import { BaseApi } from "@app/api/baseApi";

export const NewsOrgApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchNewsApiOrg: builder.query<
      TNewsApiOrgResponse,
      TSearchNewsApiOrgRequest
    >({
      query: ({ apiKey, searchParam, from, to }) => ({
        url:
          `newsapi.org/v2/everything?apiKey=${apiKey}` +
          (from ? `&from=${from}` : "") +
          (to ? `&to=${to}` : "") +
          (searchParam ? `&q="${searchParam}"` : ""),
      }),
    }),
    getHeadlinesNewsApiOrg: builder.query<
      TNewsApiOrgResponse,
      TTopHeadlinesNewsApiOrgRequest
    >({
      query: ({ apiKey, category }) => ({
        url:
          `newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}` +
          (category ? `&category=${category}` : ""),
        headers: { "X-Api-Key": apiKey },
      }),
    }),
    getSourcesNewsApiOrg: builder.query<TSourcesNewsApiOrgResponse, string>({
      query: (apiKey) => ({
        url: "newsapi.org/v2/top-headlines/sources",
        headers: { "X-Api-Key": apiKey },
      }),
    }),
  }),
});

export const {
  useLazySearchNewsApiOrgQuery,
  useGetHeadlinesNewsApiOrgQuery,
  useLazyGetHeadlinesNewsApiOrgQuery,
  useLazyGetSourcesNewsApiOrgQuery,
} = NewsOrgApi;


