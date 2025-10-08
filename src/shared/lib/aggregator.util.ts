import { TArticle } from "@entities/article";
import { API_SOURCES } from "@shared/config/apiSources";
import { normalizeNewsApiArticles } from "./normalizers/newsApi.normalizer";
import { normalizeNyTimesArticles } from "./normalizers/nyTimes.normalizer";
import { normalizeGuardianArticles } from "./normalizers/guardian.normalizer";

type GetAggregatedNewsArgs = {
  newsApiData?: unknown;
  newYorkTimesData?: unknown;
  guardianData?: unknown;
  preferences: { sources?: string[] } & Record<string, unknown>;
};

export const normalizeArticles = (mixed: any[]): TArticle[] => {
  const normalized: TArticle[] = [];

  for (const item of mixed || []) {
    // NewsAPI.org shape
    if (item && (item.urlToImage !== undefined || item.publishedAt !== undefined)) {
      normalized.push(
        normalizeNewsApiArticles([item])[0]
      );
      continue;
    }

    // NYTimes shape
    if (item && (item.headline?.main !== undefined || item.pub_date !== undefined)) {
      normalized.push(
        normalizeNyTimesArticles([item])[0]
      );
      continue;
    }

    // Guardian shape
    if (item && (item.webTitle !== undefined || item.webUrl !== undefined)) {
      normalized.push(
        normalizeGuardianArticles([item])[0]
      );
      continue;
    }
  }

  return normalized;
};

export const getAggregatedNews = ({
  newsApiData,
  newYorkTimesData,
  guardianData,
  preferences,
}: GetAggregatedNewsArgs): TArticle[] => {
  const selected = new Set(preferences?.sources || []);

  const newsApiArticles: TArticle[] = selected.has(API_SOURCES.THE_NEWS_API_ORG.id)
    ? normalizeNewsApiArticles((newsApiData as any)?.articles || [])
    : [];

  const nyTimesArticles: TArticle[] = selected.has(API_SOURCES.NEW_YORK_TIMES.id)
    ? normalizeNyTimesArticles((newYorkTimesData as any)?.response?.docs || [])
    : [];

  const guardianArticles: TArticle[] = selected.has(API_SOURCES.THE_GUARDIAN.id)
    ? normalizeGuardianArticles((guardianData as any)?.response?.results || [])
    : [];

  const merged = [...newsApiArticles, ...nyTimesArticles, ...guardianArticles];

  return merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Keep exporting the service getter for backwards compatibility
export { getNewsAggregationService } from "@shared/services/NewsAggregationService";
