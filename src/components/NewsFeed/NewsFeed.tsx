import { ArticleList } from "../ArticleList/ArticleList";
import { useAuthAlert } from "@shared/hooks/useAuthAlert";
import { Preferences } from "../Preferences/Preferences";
import { TCategory, TPreferences, TSource, TWebState } from "@entities/preferences/Preferences.types";
import { getWebState, setWebState } from "@shared/lib/webState";
import { useEffect, useState } from "react";
import { useGetNewsFeed } from "@shared/lib/useGetNewsFeed";
import { API_SOURCES } from "@shared/config/apiSources";

export const NewsFeed = () => {
  useAuthAlert();

  // to keep the preferences in local storage to prevent user losing their selected filters
  const prevWebState = getWebState<TWebState>();
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
    } as TWebState;
    setWebState(webpageState);
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
