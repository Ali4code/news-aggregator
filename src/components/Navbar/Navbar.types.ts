import { TABS } from "./Navbar.constants";

export type TTab = (typeof TABS)[keyof typeof TABS];