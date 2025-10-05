import { CloseIcon } from "../Navbar/icons/CloseIcon";
import { Tabs } from "../Tabs/Tabs";
import Classes from "./SideBar.module.css";

export const Sidebar = ({
  isOpen,
  tabs,
  setIsSideMenuOpen,
}: {
  isOpen: boolean;
  tabs: Record<string, { name: string; color: string }>;
  setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!isOpen) return <></>;
  return (
    <>
      <div className={Classes.sidebar_container}>
        <CloseIcon
          color="black"
          className={Classes.mobile_icon}
          onClick={() => setIsSideMenuOpen(false)}
        />
        <Tabs tabs={tabs} />
      </div>
      <div
        className={Classes.back_drop}
        onClick={() => setIsSideMenuOpen(false)}
      ></div>
    </>
  );
};
