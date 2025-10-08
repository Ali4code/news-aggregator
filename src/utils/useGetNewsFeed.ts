import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TPreferences } from "@entities/preferences/Preferences.types";
import { TArticle } from "@entities/article";
import { selectApiKeys } from "@app/store/slices/authSlice";
import { getNewsAggregationService } from "@shared/services/NewsAggregationService";

/**
 * Hook for fetching aggregated news feed
 * Now follows DIP by depending on NewsAggregationService abstraction
 * Follows SRP by only handling React state management for the hook
 */
export const useGetNewsFeed = ({
  preferences,
}: {
  preferences: TPreferences;
}) => {
  const apiKeys = useSelector(selectApiKeys);
  const [data, setData] = useState<TArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      if (!apiKeys) return;

      setIsLoading(true);
      try {
        const aggregationService = getNewsAggregationService();
        const articles = await aggregationService.fetchHeadlines(
          preferences,
          apiKeys
        );
        setData(articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [preferences, apiKeys]);

  return {
    data,
    isLoading,
  };
};
