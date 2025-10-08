import { useState, useEffect, useCallback } from "react";
import { TCategory, TPreferences, TSource, TWebState } from "@entities/preferences/Preferences.types";
import { getWebState, setWebState } from "@shared/lib/webState";
import { API_SOURCES } from "@shared/config/apiSources";

/**
 * Hook for managing user preferences
 * Follows SRP - only handles preferences state and persistence
 */
export const usePreferences = () => {
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

  // Persist preferences to localStorage
  useEffect(() => {
    const webpageState = {
      ...prevWebState,
      preferences,
    } as TWebState;
    setWebState(webpageState);
  }, [preferences, prevWebState]);

  const onSourceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  const onCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, source: TSource) => {
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
    },
    []
  );

  return {
    preferences,
    onSourceChange,
    onCategoryChange,
  };
};

