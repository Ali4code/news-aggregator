import { useSelector } from "react-redux";
import { selectSelectedTab } from "@app/store/slices/tabsSlice";
import { getRouteRegistry } from "@shared/routing/RouteRegistry";

/**
 * MainLayout component - now follows OCP
 * Uses RouteRegistry to resolve routes without hardcoded conditionals
 * New routes can be added via the registry without modifying this component
 */
export const MainLayout = () => {
  const selectedTab = useSelector(selectSelectedTab);
  const registry = getRouteRegistry();

  // Get the component for the selected tab
  const routeName = selectedTab?.name;
  const RouteComponent = routeName ? registry.getRoute(routeName) : registry.getRoute("");

  // Render the component or fallback
  return RouteComponent ? <RouteComponent /> : null;
};
