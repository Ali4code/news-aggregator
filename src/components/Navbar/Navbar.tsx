import { Tabs } from "../Tabs/Tabs";
import { HamburgerIcon } from "./icons/HamburgerIcon";
import { NewsIcon } from "./icons/NewsIcon";
import Classes from "./Navbar.module.css";

export const Navbar = ({
  isSideBarOpen,
  setIsSideBarOpen,
  tabs,
}: {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isOpen: boolean) => void;
  tabs: { [key: string]: { name: string; color: string } };
}) => {
  return (
    <div className={Classes.navbar_container}>
      {!isSideBarOpen && (
        <HamburgerIcon
          color="black"
          className={Classes.mobile_icon}
          onClick={() => setIsSideBarOpen(true)}
        />
      )}
      <div className={Classes.flex}>
        <NewsIcon />
        <div className={Classes.tabs_wrapper}>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};
