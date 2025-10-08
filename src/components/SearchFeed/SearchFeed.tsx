import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ArticleList } from "../ArticleList/ArticleList";
import { SearchColumn } from "../SearchColumn/SearchColumn";
import { API_SOURCES } from "@shared/config/apiSources";
import { selectApiKeys } from "@app/store/slices/authSlice";
import { useAuthAlert } from "@shared/hooks/useAuthAlert";
import { useNewsSearch } from "../../hooks/useNewsSearch";

/**
 * SearchFeed component - now follows SRP
 * Only responsible for rendering and coordinating search UI
 * Search logic extracted to useNewsSearch hook
 */
export const SearchFeed = () => {
  useAuthAlert();
  
  const [searchFilters, setSearchFilters] = useState<{
    searchParam?: string;
    from?: string;
    to?: string;
    source?: (typeof API_SOURCES)[keyof typeof API_SOURCES]["id"];
  }>({ source: API_SOURCES.THE_GUARDIAN.id });

  const apiKeys = useSelector(selectApiKeys);
  const { searchResults, isLoading, search } = useNewsSearch();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSearch = () => {
    if (!searchFilters.source || !apiKeys) return;

    const apiKey = ((): string | undefined => {
      if (searchFilters.source === API_SOURCES.THE_GUARDIAN.id) return apiKeys.guardianNews;
      if (searchFilters.source === API_SOURCES.NEW_YORK_TIMES.id) return apiKeys.nyTimes;
      if (searchFilters.source === API_SOURCES.THE_NEWS_API_ORG.id) return apiKeys.newsApiOrg;
      return apiKeys[searchFilters.source as keyof typeof apiKeys];
    })();

    if (!apiKey) return;

    search(searchFilters.source, apiKey, {
      searchParam: searchFilters.searchParam,
      from: searchFilters.from,
      to: searchFilters.to,
    });
  };

  const isSearchDisabled = useMemo(() => {
    if (!searchFilters.source) return true;
    if (!apiKeys) return true;
    if (!searchFilters.searchParam || searchFilters.searchParam.trim() === "") return true;
    const hasKey =
      (searchFilters.source === API_SOURCES.THE_GUARDIAN.id && !!apiKeys.guardianNews) ||
      (searchFilters.source === API_SOURCES.NEW_YORK_TIMES.id && !!apiKeys.nyTimes) ||
      (searchFilters.source === API_SOURCES.THE_NEWS_API_ORG.id && !!apiKeys.newsApiOrg);
    return !hasKey;
  }, [searchFilters.source, searchFilters.searchParam, apiKeys]);

  return (
    <>
      <SearchColumn
        onChange={onChange}
        onSearch={onSearch}
        searchFilters={searchFilters}
        isSearchDisabled={isSearchDisabled}
      />
      <ArticleList articles={searchResults} isLoading={isLoading} />
    </>
  );
};
