import { TArticle } from "@entities/article";
import { INewsApiService, INewsApiRequest } from "../abstractions/INewsApiService";
import { TheGuardianApi } from "../theGuardian/TheGuardian.api";
import { normalizeGuardianArticles } from "@shared/lib/normalizers/guardian.normalizer";
import { executeQuery } from "../helpers/queryHelper";

/**
 * Implementation of INewsApiService for The Guardian
 * Follows Dependency Inversion Principle by implementing the abstraction
 */
export class TheGuardianService implements INewsApiService {
  readonly id = "theGuardian";
  readonly name = "The Guardian";

  async fetchHeadlines(request: INewsApiRequest): Promise<TArticle[]> {
    return this.search(request);
  }

  async search(request: INewsApiRequest): Promise<TArticle[]> {
    const result = await executeQuery(
      TheGuardianApi.endpoints.searchGuardian.initiate({
        apiKey: request.apiKey,
        searchParam: request.searchParam,
        from: request.from,
        to: request.to,
        category: request.category,
      })
    );

    if (result.data && 'response' in result.data && result.data.response?.results) {
      return normalizeGuardianArticles(result.data.response.results);
    }

    return [];
  }
}

