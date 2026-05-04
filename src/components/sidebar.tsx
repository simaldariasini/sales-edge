
import { useEffect, useRef, useState, type FC } from "react";
import MenuItem from "./MenuItem";
import DropdownPanel from "./DropdownPanel";

import {
  DashboardIcon,
  SystemIcon,
  SalesIcon,
  AccountIcon,
  LogisticsIcon,
  ReportsIcon,
  OthersIcon
} from "../icons/icon";

// ✅ IMPORT IMAGES
import logo from "../assets/logo.png";
import bottomLogo from "../assets/bottom-logo.png";

interface SidebarProps {
  onOpenView?: (view: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ onOpenView = () => undefined }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!sidebarRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const handleMenuClick = (label: string) => {
    // Toggle: if already open, close it; otherwise open
    if (activeMenu === label) {
      setActiveMenu(null);
    } else {
      setActiveMenu(label);
    }
  };

  return (
    <div className="sidebar-wrapper" ref={sidebarRef}>
      <div className="sidebar">

        {/* TOP LOGO */}
        <img src={logo} alt="logo" className="logo-top" />

        <MenuItem
          icon={<DashboardIcon />}
          label="Dashboard"
          active={activeMenu === "Dashboard"}
          onClick={() => handleMenuClick("Dashboard")}
        />
        <MenuItem
          icon={<SystemIcon />}
          label="System"
          active={activeMenu === "System"}
          onClick={() => handleMenuClick("System")}
        />
        <MenuItem
          icon={<SalesIcon />}
          label="Sales"
          active={activeMenu === "Sales"}
          onClick={() => handleMenuClick("Sales")}
        />
        <MenuItem
          icon={<AccountIcon />}
          label="Accounts"
          active={activeMenu === "Accounts"}
          onClick={() => handleMenuClick("Accounts")}
        />
        <MenuItem
          icon={<LogisticsIcon />}
          label="Logistics"
          active={activeMenu === "Logistics"}
          onClick={() => handleMenuClick("Logistics")}
        />
        <MenuItem
          icon={<ReportsIcon />}
          label="Reports"
          active={activeMenu === "Reports"}
          onClick={() => handleMenuClick("Reports")}
        />
        <MenuItem
          icon={<OthersIcon />}
          label="Others"
          active={activeMenu === "Others"}
          onClick={() => handleMenuClick("Others")}
        />

        {/* BOTTOM LOGO */}
        <img src={bottomLogo} alt="bottom" className="logo-bottom" />

      </div>

      {/* DROPDOWN PANEL — show for any active menu */}
      {activeMenu && (
        <DropdownPanel
          menuTitle={activeMenu}
          onOpenView={(view) => {
            onOpenView(view);
            setActiveMenu(null);
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;
