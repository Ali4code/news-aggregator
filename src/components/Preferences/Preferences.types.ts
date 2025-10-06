import { NEWS_API_CATEGORIES } from "../../services/NewsApi/NewsApi.constants";
import { NY_CATEGORIES } from "../../services/NewYorkTimes/NewYorkTimes.constants";
import { GUARDIAN_CATEGORIES } from "../../services/TheGuardian/TheGuardian.constants";
import { API_SOURCES } from "../SearchColumn/SearchColumn.constants";

export type TSource = (typeof API_SOURCES)[keyof typeof API_SOURCES]["id"];
export type TNYCategory = (typeof NY_CATEGORIES)[keyof typeof NY_CATEGORIES];
export type TNewsAPiCategories =
  (typeof NEWS_API_CATEGORIES)[keyof typeof NEWS_API_CATEGORIES];
export type TGuardianCategories =
  (typeof GUARDIAN_CATEGORIES)[keyof typeof GUARDIAN_CATEGORIES];
export type TCategory = TNYCategory | TNewsAPiCategories | TGuardianCategories;

export type TPreferences = {
  category?: {
    [API_SOURCES.NEW_YORK_TIMES.id]?: TNYCategory;
    [API_SOURCES.THE_NEWS_API_ORG.id]?: TNewsAPiCategories;
    [API_SOURCES.THE_GUARDIAN.id]?: TGuardianCategories;
  };
  sources?: TSource[];
  Authors?: string[];
};

export type TWebState = {
  selectedTab: string;
  preferences?: TPreferences;
  isPreferencesExpanded: boolean;
};
