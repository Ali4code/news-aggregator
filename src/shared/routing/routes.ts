import { NewsFeed } from "@components/NewsFeed/NewsFeed";
import { SearchFeed } from "@components/SearchFeed/SearchFeed";
import { AuthenticationForm } from "@components/AuthenticationForm/AuthenticationForm";
import { TABS } from "@components/Navbar/Navbar.constants";
import { getRouteRegistry } from "./RouteRegistry";

/**
 * Initialize and register all application routes
 * Following OCP - new routes can be added here without modifying MainLayout
 */
export const initializeRoutes = () => {
  const registry = getRouteRegistry();

  // Register routes
  registry.register(TABS.news.name, NewsFeed);
  registry.register(TABS.search.name, SearchFeed);
  registry.register(TABS.authorization.name, AuthenticationForm);

  // Set default route
  registry.setDefault(NewsFeed);
};

