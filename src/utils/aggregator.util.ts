import { TArticle } from "@entities/article";
import { TPreferences } from "@entities/preferences/Preferences.types";
import { API_SOURCES } from "@shared/config/apiSources";
import { TNewsApiOrgResponse } from "@shared/api/newsApi/NewsApi.types";
import { TNewYorTimesResponse } from "@shared/api/nyTimes/NewYorkTimes.types";
import { TGuardianResponse } from "@shared/api/theGuardian/TheGuardian.types";
import { normalizeNewsApiArticles } from "@shared/lib/normalizers/newsApi.normalizer";
import { normalizeNyTimesArticles } from "@shared/lib/normalizers/nyTimes.normalizer";
import { normalizeGuardianArticles } from "@shared/lib/normalizers/guardian.normalizer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeArticles = (articles: any[]): TArticle[] => {
  return articles?.map((article) => {
    return {
      id:
        article.id ||
        article.title ||
        article.headline?.main ||
        article.webTitle,
      title: article.title || article.headline?.main || article.webTitle,
      content:
        article.description || article.abstract || article.fields?.trailText,
      image:
        article.urlToImage ||
        article.fields?.thumbnail ||
        (article.multimedia?.[0]?.url
          ? `https://www.nytimes.com/${article.multimedia?.[0]?.url}`
          : null),
      date:
        article.pub_date ||
        article.fields?.firstPublicationDate ||
        article.publishedAt,
      url: article.url || article.webUrl || article.web_url,
      source:
        article.source?.name || article.source || article.fields?.publication,
    };
  });
};

export const getAggregatedNews = ({
  newsApiData,
  newYorkTimesData,
  guardianData,
  preferences,
}: {
  newsApiData?: TNewsApiOrgResponse;
  newYorkTimesData?: TNewYorTimesResponse;
  guardianData?: TGuardianResponse;
  preferences: TPreferences;
}): TArticle[] => {
  const isNewsOrgIncluded = preferences.sources?.includes(
    API_SOURCES.THE_NEWS_API_ORG.id
  );

  const isNewYorkTimesIncluded = preferences.sources?.includes(
    API_SOURCES.NEW_YORK_TIMES.id
  );

  const isGuardianIncluded = preferences.sources?.includes(
    API_SOURCES.THE_GUARDIAN.id
  );
  const newsApiArticles = isNewsOrgIncluded
    ? normalizeNewsApiArticles(newsApiData?.articles || [])
    : [];
  const nyTimesArticles = isNewYorkTimesIncluded
    ? normalizeNyTimesArticles(newYorkTimesData?.response?.docs || [])
    : [];
  const guardianArticles = isGuardianIncluded
    ? normalizeGuardianArticles(guardianData?.response?.results || [])
    : [];

  const normalizedArticles = [...newsApiArticles, ...nyTimesArticles, ...guardianArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // TODO: sort aggregated by date + normalize response between 3 sources
  return normalizedArticles;
};
