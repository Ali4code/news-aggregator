import { useState } from "react";
import { useLazySearchGuardianQuery } from "@shared/api/theGuardian/TheGuardian.api";
import { useLazySearchNewsApiOrgQuery } from "@shared/api/newsApi/NewsApi.api";
import { useLazySearchNewYorkTimesQuery } from "@shared/api/nyTimes/NewYorkTimes.api";
import { ArticleList } from "../ArticleList/ArticleList";
import { SearchColumn } from "../SearchColumn/SearchColumn";
import { API_SOURCES } from "@shared/config/apiSources";
import { useSelector } from "react-redux";
import { selectApiKeys } from "@app/store/slices/authSlice";
import { useAuthAlert } from "@shared/hooks/useAuthAlert";
import { normalizeArticles } from "@shared/lib/aggregator.util";
import { TArticle } from "@entities/article";

export const SearchFeed = () => {
  useAuthAlert();
  const [searchResults, setSearchResults] = useState<TArticle[]>([]);
  const [searchFilters, setSearchFilters] = useState<{
    searchParam?: string;
    from?: string;
    to?: string;
    source?: (typeof API_SOURCES)[keyof typeof API_SOURCES]["id"];
  }>({});

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const apiKeys = useSelector(selectApiKeys);

  const [fetchGuardianSearch, { isLoading: isGuardianLoading }] =
    useLazySearchGuardianQuery();
  const [fetchNewsApiSearch, { isLoading: isNewsApiLoading }] =
    useLazySearchNewsApiOrgQuery();
  const [fetchNewYorkTimesSearch, { isLoading: isNewYorkTimesLoading }] =
    useLazySearchNewYorkTimesQuery();

  const isLoading =
    isGuardianLoading || isNewsApiLoading || isNewYorkTimesLoading;

  const onSearch = () => {
    switch (searchFilters.source) {
      case API_SOURCES.THE_GUARDIAN.id:
        fetchGuardianSearch({
          apiKey: apiKeys?.guardianNews,
          searchParam: searchFilters.searchParam,
          from: searchFilters.from,
          to: searchFilters.to,
        })
          .unwrap()
          .then((data) => {
            setSearchResults(normalizeArticles(data.response.results));
          });
        break;
      case API_SOURCES.THE_NEWS_API_ORG.id:
        fetchNewsApiSearch({
          apiKey: apiKeys?.newsApiOrg,
          searchParam: searchFilters.searchParam,
          from: searchFilters.from,
          to: searchFilters.to,
        })
          .unwrap()
          .then((data) => {
            setSearchResults(normalizeArticles(data.articles));
          });
        break;
      case API_SOURCES.NEW_YORK_TIMES.id:
        fetchNewYorkTimesSearch({
          apiKey: apiKeys?.nyTimes,
          searchParam: searchFilters.searchParam,
          from: searchFilters.from,
          to: searchFilters.to,
        })
          .unwrap()
          .then((data) => {
            setSearchResults(normalizeArticles(data.response.docs));
          });
        break;
    }
  };

  return (
    <>
      <SearchColumn
        onChange={onChange}
        onSearch={onSearch}
        searchFilters={searchFilters}
      />
      <ArticleList articles={searchResults} isLoading={isLoading} />
    </>
  );
};
