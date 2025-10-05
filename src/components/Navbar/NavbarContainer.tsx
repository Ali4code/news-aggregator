import { useState } from "react";
import { Sidebar } from "../SideBar/SideBar";
import { Navbar } from "./Navbar";
import { TABS } from "./Navbar.constants";

export const NavbarContainer = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        isSideBarOpen={isSideMenuOpen}
        setIsSideBarOpen={setIsSideMenuOpen}
        tabs={TABS}
      />
      <Sidebar
        isOpen={isSideMenuOpen}
        tabs={TABS}
        setIsSideMenuOpen={setIsSideMenuOpen}
      />
    </>
  );
};
