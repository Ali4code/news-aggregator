import { TArticle } from "@entities/article";
import { INewsApiService, INewsApiRequest } from "../abstractions/INewsApiService";
import { TheNewYorkTimesApi } from "../nyTimes/NewYorkTimes.api";
import { normalizeNyTimesArticles } from "@shared/lib/normalizers/nyTimes.normalizer";
import { executeQuery } from "../helpers/queryHelper";

/**
 * Implementation of INewsApiService for New York Times
 * Follows Dependency Inversion Principle by implementing the abstraction
 */
export class NewYorkTimesService implements INewsApiService {
  readonly id = "newYorkTimes";
  readonly name = "New York Times";

  async fetchHeadlines(request: INewsApiRequest): Promise<TArticle[]> {
    return this.search(request);
  }

  async search(request: INewsApiRequest): Promise<TArticle[]> {
    const result = await executeQuery(
      TheNewYorkTimesApi.endpoints.searchNewYorkTimes.initiate({
        apiKey: request.apiKey,
        searchParam: request.searchParam,
        from: request.from,
        to: request.to,
        category: request.category,
      })
    );

    if (result.data && 'response' in result.data && result.data.response?.docs) {
      return normalizeNyTimesArticles(result.data.response.docs);
    }

    return [];
  }
}

