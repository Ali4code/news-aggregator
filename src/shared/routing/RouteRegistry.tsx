import { ComponentType } from "react";

/**
 * Route definition interface
 */
export interface IRoute {
  name: string;
  component: ComponentType;
}

/**
 * Route registry following OCP
 * Open for extension (add new routes) but closed for modification
 */
export class RouteRegistry {
  private static instance: RouteRegistry;
  private routes: Map<string, ComponentType> = new Map();
  private defaultRoute: ComponentType | null = null;

  private constructor() {}

  /**
   * Get the singleton instance
   */
  public static getInstance(): RouteRegistry {
    if (!RouteRegistry.instance) {
      RouteRegistry.instance = new RouteRegistry();
    }
    return RouteRegistry.instance;
  }

  /**
   * Register a route
   * This allows adding new routes without modifying existing code (OCP)
   */
  public register(routeName: string, component: ComponentType): void {
    this.routes.set(routeName, component);
  }

  /**
   * Set the default route to show when no route matches
   */
  public setDefault(component: ComponentType): void {
    this.defaultRoute = component;
  }

  /**
   * Get a route component by name
   */
  public getRoute(routeName: string): ComponentType | null {
    return this.routes.get(routeName) || this.defaultRoute;
  }
}

/**
 * Convenience function to get the registry instance
 */
export const getRouteRegistry = () => RouteRegistry.getInstance();

