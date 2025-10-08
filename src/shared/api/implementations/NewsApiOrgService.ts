import { TArticle } from "@entities/article";
import { INewsApiService, INewsApiRequest } from "../abstractions/INewsApiService";
import { NewsOrgApi } from "../newsApi/NewsApi.api";
import { normalizeNewsApiArticles } from "@shared/lib/normalizers/newsApi.normalizer";
import { executeQuery } from "../helpers/queryHelper";

/**
 * Implementation of INewsApiService for NewsAPI.org
 * Follows Dependency Inversion Principle by implementing the abstraction
 */
export class NewsApiOrgService implements INewsApiService {
  readonly id = "newsApiOrg";
  readonly name = "News Api Org";

  async fetchHeadlines(request: INewsApiRequest): Promise<TArticle[]> {
    const result = await executeQuery(
      NewsOrgApi.endpoints.getHeadlinesNewsApiOrg.initiate({
        apiKey: request.apiKey,
        category: request.category as "business" | "entertainment" | "general" | "health" | "science" | "sports" | "technology" | undefined,
      })
    );

    if (result.data && 'articles' in result.data) {
      return normalizeNewsApiArticles(result.data.articles);
    }

    return [];
  }

  async search(request: INewsApiRequest): Promise<TArticle[]> {
    const result = await executeQuery(
      NewsOrgApi.endpoints.searchNewsApiOrg.initiate({
        apiKey: request.apiKey,
        searchParam: request.searchParam,
        from: request.from,
        to: request.to,
      })
    );

    if (result.data && 'articles' in result.data) {
      return normalizeNewsApiArticles(result.data.articles);
    }

    return [];
  }
}

