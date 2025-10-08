import { TArticle } from "@entities/article";

/**
 * Generic request parameters for news API queries
 */
export interface INewsApiRequest {
  apiKey: string;
  searchParam?: string;
  from?: string;
  to?: string;
  category?: string;
}

/**
 * Abstraction for news API services
 * This interface follows the Dependency Inversion Principle (DIP)
 * allowing high-level modules to depend on this abstraction
 * rather than concrete implementations
 */
export interface INewsApiService {
  /**
   * Unique identifier for the service
   */
  readonly id: string;

  /**
   * Display name of the service
   */
  readonly name: string;

  /**
   * Fetch news headlines based on request parameters
   * @param request - The request parameters
   * @returns Promise resolving to normalized articles
   */
  fetchHeadlines(request: INewsApiRequest): Promise<TArticle[]>;

  /**
   * Search for news articles based on request parameters
   * @param request - The request parameters
   * @returns Promise resolving to normalized articles
   */
  search(request: INewsApiRequest): Promise<TArticle[]>;
}

