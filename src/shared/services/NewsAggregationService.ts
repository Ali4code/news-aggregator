import { TArticle } from "@entities/article";
import { TPreferences } from "@entities/preferences/Preferences.types";
import { getNewsApiRegistry } from "../api/registry/NewsApiServiceRegistry";
import { INewsApiRequest } from "../api/abstractions/INewsApiService";

/**
 * Service responsible for aggregating news from multiple sources
 * Follows Single Responsibility Principle - only handles news aggregation
 * Follows Dependency Inversion Principle - depends on INewsApiService abstraction
 * Follows Open/Closed Principle - can handle new sources without modification via registry
 */
export class NewsAggregationService {
  private registry = getNewsApiRegistry();

  /**
   * Fetch headlines from multiple sources based on preferences
   */
  async fetchHeadlines(
    preferences: TPreferences,
    apiKeys: { [key: string]: string }
  ): Promise<TArticle[]> {
    const selectedSources = preferences.sources || [];
    // Normalize apiKeys object to align with registry IDs
    const normalizedApiKeys: { [key: string]: string } = {
      ...apiKeys,
      newYorkTimes: apiKeys.newYorkTimes || apiKeys.nyTimes,
      theGuardian: apiKeys.theGuardian || apiKeys.guardianNews,
      newsApiOrg: apiKeys.newsApiOrg,
    };
    const promises: Promise<TArticle[]>[] = [];

    for (const sourceId of selectedSources) {
      const service = this.registry.getService(sourceId);
      if (!service || !normalizedApiKeys[sourceId]) {
        continue;
      }

      const request: INewsApiRequest = {
        apiKey: normalizedApiKeys[sourceId],
        category: preferences.category?.[sourceId],
      };

      promises.push(
        service.fetchHeadlines(request).catch(() => {
          // Log error but don't fail the entire operation
          console.error(`Failed to fetch from ${service.name}`);
          return [];
        })
      );
    }

    const results = await Promise.all(promises);
    return this.sortByDate(results.flat());
  }

  /**
   * Search for news articles across selected source
   */
  async search(
    sourceId: string,
    apiKey: string,
    searchParams: {
      searchParam?: string;
      from?: string;
      to?: string;
      category?: string;
    }
  ): Promise<TArticle[]> {
    const service = this.registry.getService(sourceId);
    if (!service) {
      throw new Error(`Service ${sourceId} not found`);
    }

    const request: INewsApiRequest = {
      apiKey,
      ...searchParams,
    };

    return service.search(request);
  }

  /**
   * Sort articles by date (newest first)
   */
  private sortByDate(articles: TArticle[]): TArticle[] {
    return articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}

/**
 * Singleton instance for convenience
 */
let instance: NewsAggregationService | null = null;

export const getNewsAggregationService = (): NewsAggregationService => {
  if (!instance) {
    instance = new NewsAggregationService();
  }
  return instance;
};

