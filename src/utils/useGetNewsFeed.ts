import { TPreferences } from "../components/Preferences/Preferences.types";
import { useSelector } from "react-redux";
import { selectApiKeys } from "../store/authSlice";
import { useGetHeadlinesNewsApiOrgQuery } from "../services/NewsApi/NewsApi.api";
import { useSearchNewYorkTimesQuery } from "../services/NewYorkTimes/NewYorkTimes.api";
import { API_SOURCES } from "../components/SearchColumn/SearchColumn.constants";
import { getAggregatedNews } from "./aggregator.util";
import { useSearchGuardianQuery } from "../services/TheGuardian/TheGuardian.api";

export const useGetNewsFeed = ({
  preferences,
}: {
  preferences: TPreferences;
}) => {
  const apiKeys = useSelector(selectApiKeys);

  const {
    data: newsApiData,
    isLoading: isNewsApiLoading,
    isFetching: isNewsApiFetching,
  } = useGetHeadlinesNewsApiOrgQuery(
    {
      apiKey: apiKeys?.newsApiOrg,
      category: preferences.category?.newsApiOrg,
    },
    {
      skip:
        !apiKeys?.newsApiOrg ||
        !preferences.sources?.includes(API_SOURCES.THE_NEWS_API_ORG.id),
    }
  );

  const {
    data: newYorkTimesData,
    isLoading: isNewYorkTimesLoading,
    isFetching: isNewYorkTimesFetching,
  } = useSearchNewYorkTimesQuery(
    {
      apiKey: apiKeys?.nyTimes,
      category: preferences.category?.newYorkTimes,
    },
    {
      skip:
        !apiKeys?.nyTimes ||
        !preferences.sources?.includes(API_SOURCES.NEW_YORK_TIMES.id),
    }
  );
  const {
    data: guardianData,
    isLoading: isGuardianLoading,
    isFetching: isGuardianFetching,
  } = useSearchGuardianQuery(
    {
      apiKey: apiKeys?.guardianNews,
      category: preferences.category?.theGuardian,
    },
    {
      skip:
        !apiKeys?.guardianNews ||
        !preferences.sources?.includes(API_SOURCES.THE_GUARDIAN.id),
    }
  );

  const aggregatedNews = getAggregatedNews({
    guardianData,
    newsApiData,
    newYorkTimesData,
    preferences,
  });

  return {
    data: aggregatedNews,
    isLoading:
      isNewYorkTimesLoading ||
      isNewsApiLoading ||
      isGuardianLoading ||
      isGuardianFetching ||
      isNewYorkTimesFetching ||
      isNewsApiFetching,
  };
};
