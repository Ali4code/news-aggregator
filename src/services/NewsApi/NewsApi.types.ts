import { NEWS_API_CATEGORIES } from "./NewsApi.constants";

export type TSearchNewsApiOrgRequest = {
  apiKey?: string;
  searchParam?: string;
  from?: string;
  to?: string;
};

export type TNewsApiArticle = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type TNewsApiOrgResponse = {
  status: string;
  totalResults: number;
  articles: TNewsApiArticle[];
};

export type TTopHeadlinesNewsApiOrgRequest = {
  category?: (typeof NEWS_API_CATEGORIES)[keyof typeof NEWS_API_CATEGORIES];
  apiKey: string;
  sources?: string;
};

export type TSourcesNewsApiOrgResponse = {
  status: string;
  sources: {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
  }[];
};
