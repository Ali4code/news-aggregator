import { useSelector } from "react-redux";
import { selectSelectedTab } from "../../store/tabsSlice";
import { NewsFeed } from "../NewsFeed/NewsFeed";
import { TABS } from "../Navbar/Navbar.constants";
import { AuthenticationForm } from "../AuthenticationForm/AuthenticationForm";
import { SearchFeed } from "../SearchFeed/SearchFeed";

export const MainLayout = () => {
  const selectedTab = useSelector(selectSelectedTab);

  if (!selectedTab) {
    return <NewsFeed />;
  }

  if (selectedTab.name === TABS.news.name) {
    return <NewsFeed />;
  }
  if (selectedTab.name === TABS.search.name) {
    return <SearchFeed />;
  }
  if (selectedTab.name === TABS.authorization.name) {
    return <AuthenticationForm />;
  }

  return <div></div>;
};
