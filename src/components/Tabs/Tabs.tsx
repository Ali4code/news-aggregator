import { useDispatch, useSelector } from "react-redux";
import Classes from "./Tabs.module.css";
import { selectApiKeys } from "@app/store/slices/authSlice";
import { TTab } from "../Navbar/Navbar.types";
import { WEBPAGE_STATE_LOCAL_STORAGE_KEY } from "@shared/config/constants";
import { readFromLocalStorage, writeToLocalStorage } from "@shared/lib/storage";
import { selectSelectedTab, setActionSelectedTab } from "@app/store/slices/tabsSlice";
import { TWebState } from "@entities/preferences/Preferences.types";

export const Tabs = ({
  tabs,
}: {
  tabs: Record<string, { name: string; color: string }>;
}) => {
  const apiKeys = useSelector(selectApiKeys);
  const isAuthFilled =
    apiKeys?.newsApiOrg && apiKeys?.guardianNews && apiKeys?.nyTimes;

  const dispatch = useDispatch();
  const selectedTab = useSelector(selectSelectedTab);
  const onTabSelect = (tab: TTab) => {
    const prevWebState =
      (readFromLocalStorage<TWebState>(WEBPAGE_STATE_LOCAL_STORAGE_KEY) as TWebState) ||
      ({} as TWebState);

    const webpageState = {
      ...prevWebState,
      selectedTab: tab,
    };

    writeToLocalStorage(WEBPAGE_STATE_LOCAL_STORAGE_KEY, webpageState);

    dispatch(setActionSelectedTab({ selectedTab: tab }));
  };
  return (
    <div className="flex_col">
      <div className={Classes.tabs_wrapper}>
        {Object.keys(tabs)?.map((key) => {
          const isSelected = selectedTab?.name === tabs[key].name;
          if (key === "authorization") {
            return (
              <div
                key={key}
                className={
                  (isSelected
                    ? `${Classes.selected_tab}`
                    : `${Classes.unselected_tab}`) +
                  (isAuthFilled
                    ? ` ${Classes.green_tab}`
                    : ` ${Classes.alert_tab}`)
                }
                onClick={() => onTabSelect(tabs[key])}
              >
                {tabs[key].name}
              </div>
            );
          }
          return (
            <div
              key={key}
              className={
                isSelected
                  ? `${Classes.selected_tab}`
                  : `${Classes.unselected_tab}`
              }
              onClick={() => onTabSelect(tabs[key])}
            >
              {tabs[key].name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
