import { ArticleList } from "../ArticleList/ArticleList";
import { useAuthAlert } from "../../utils/useAuthAlert";
import { Preferences } from "../Preferences/Preferences";
import {
  TCategory,
  TPreferences,
  TSource,
  TWebState,
} from "../Preferences/Preferences.types";
import { WEBPAGE_STATE_LOCAL_STORAGE_KEY } from "../../constants";
import { useEffect, useState } from "react";
import { useGetNewsFeed } from "../../utils/useGetNewsFeed";
import { API_SOURCES } from "../SearchColumn/SearchColumn.constants";

export const NewsFeed = () => {
  useAuthAlert();

  // to keep the preferences in local storage to prevent user losing their selected filters
  const prevWebState = JSON.parse(
    localStorage.getItem(WEBPAGE_STATE_LOCAL_STORAGE_KEY) ?? "{}"
  ) as TWebState;
  const [preferences, setPreferences] = useState<TPreferences>(
    prevWebState?.preferences ?? {
      sources: [
        API_SOURCES.THE_GUARDIAN.id,
        API_SOURCES.THE_NEWS_API_ORG.id,
        API_SOURCES.NEW_YORK_TIMES.id,
      ],
    }
  );

  const onSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as TSource;
    setPreferences((prev) => {
      const sources = [...(prev?.sources ?? [])];
      if (sources.includes(value)) {
        sources.splice(sources.indexOf(value), 1);
      } else {
        sources.push(value);
      }
      return { ...prev, sources: sources };
    });
  };

  const onCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    source: TSource
  ) => {
    const value = event.target.value as TCategory;
    if (value === "all") {
      setPreferences((prev) => ({
        ...prev,
        category: { ...prev?.category, [source]: undefined },
      }));
      return;
    }
    setPreferences((prev) => ({
      ...prev,
      category: { ...prev?.category, [source]: value },
    }));
  };

  useEffect(() => {
    const webpageState = {
      ...prevWebState,
      preferences,
    };
    localStorage.setItem(
      WEBPAGE_STATE_LOCAL_STORAGE_KEY,
      JSON.stringify(webpageState)
    );
  }, [preferences, prevWebState]);

  const { data, isLoading } = useGetNewsFeed({ preferences });

  return (
    <>
      <Preferences
        preferences={preferences}
        onCategoryChange={onCategoryChange}
        onSourceChange={onSourceChange}
      />
      <ArticleList isLoading={isLoading} articles={data} />
    </>
  );
};
