import { useState } from "react";
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
  }>({});

  const apiKeys = useSelector(selectApiKeys);
  const { searchResults, isLoading, search } = useNewsSearch();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSearch = () => {
    if (!searchFilters.source || !apiKeys) return;

    const apiKey = apiKeys[searchFilters.source as keyof typeof apiKeys];
    if (!apiKey) return;

    search(searchFilters.source, apiKey, {
      searchParam: searchFilters.searchParam,
      from: searchFilters.from,
      to: searchFilters.to,
    });
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
