import { INewsApiService } from "../abstractions/INewsApiService";
import { NewsApiOrgService } from "../implementations/NewsApiOrgService";
import { NewYorkTimesService } from "../implementations/NewYorkTimesService";
import { TheGuardianService } from "../implementations/TheGuardianService";

/**
 * Registry for news API services
 * Follows Open/Closed Principle - open for extension (can add new services),
 * closed for modification (existing code doesn't need to change)
 */
export class NewsApiServiceRegistry {
  private static instance: NewsApiServiceRegistry;
  private services: Map<string, INewsApiService> = new Map();

  private constructor() {
    // Register all available services
    this.register(new NewsApiOrgService());
    this.register(new NewYorkTimesService());
    this.register(new TheGuardianService());
  }

  /**
   * Get the singleton instance of the registry
   */
  public static getInstance(): NewsApiServiceRegistry {
    if (!NewsApiServiceRegistry.instance) {
      NewsApiServiceRegistry.instance = new NewsApiServiceRegistry();
    }
    return NewsApiServiceRegistry.instance;
  }

  /**
   * Register a new news API service
   * This allows extension without modifying existing code (OCP)
   */
  public register(service: INewsApiService): void {
    this.services.set(service.id, service);
  }

  /**
   * Get a service by its ID
   */
  public getService(id: string): INewsApiService | undefined {
    return this.services.get(id);
  }

  /**
   * Get all registered services
   */
  public getAllServices(): INewsApiService[] {
    return Array.from(this.services.values());
  }

  /**
   * Check if a service is registered
   */
  public hasService(id: string): boolean {
    return this.services.has(id);
  }
}

/**
 * Convenience function to get the registry instance
 */
export const getNewsApiRegistry = () => NewsApiServiceRegistry.getInstance();

