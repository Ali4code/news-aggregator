import { ArticleList } from "../ArticleList/ArticleList";
import { useAuthAlert } from "@shared/hooks/useAuthAlert";
import { Preferences } from "../Preferences/Preferences";
import { useGetNewsFeed } from "@shared/lib/useGetNewsFeed";
import { usePreferences } from "../../hooks/usePreferences";

/**
 * NewsFeed component - now follows SRP
 * Only responsible for rendering the news feed UI
 * Preferences management extracted to usePreferences hook
 */
export const NewsFeed = () => {
  useAuthAlert();

  const { preferences, onSourceChange, onCategoryChange } = usePreferences();
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
