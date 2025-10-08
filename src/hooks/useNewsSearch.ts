import { useState, useCallback } from "react";
import { TArticle } from "@entities/article";
import { getNewsAggregationService } from "@shared/services/NewsAggregationService";

/**
 * Hook for news search functionality
 * Follows SRP - only handles search state and logic
 */
export const useNewsSearch = () => {
  const [searchResults, setSearchResults] = useState<TArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async (
      sourceId: string,
      apiKey: string,
      searchParams: {
        searchParam?: string;
        from?: string;
        to?: string;
        category?: string;
      }
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const aggregationService = getNewsAggregationService();
        const results = await aggregationService.search(
          sourceId,
          apiKey,
          searchParams
        );
        setSearchResults(results);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to search news";
        setError(errorMessage);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  return {
    searchResults,
    isLoading,
    error,
    search,
    clearResults,
  };
};

