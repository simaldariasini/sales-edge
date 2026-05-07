import { useEffect, useRef, useState } from "react";
import SideProfile from "./topbar/SideProfile";

function ProfileIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.8 18c.9-2.6 2.7-4 5.2-4s4.3 1.4 5.2 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 7V5.5A1.5 1.5 0 0 1 11.5 4H18v16h-6.5A1.5 1.5 0 0 1 10 18.5V17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12h10m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const openProfile = () => {
    setShowProfile(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-right">
          <div className="help-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>

          <div className="topbar-profile-menu" ref={menuRef}>
            <button className={`user-profile ${isMenuOpen ? "user-profile-active" : ""}`} onClick={() => setIsMenuOpen((current) => !current)}>
              <div className="user-avatar">
                <img src="https://ui-avatars.com/api/?name=Krishna+Kumar&background=E5E7EB&color=4B5563" alt="avatar" />
              </div>
              <div className="user-info">
                <span className="user-name">Krishna Kumar</span>
                <span className="user-role">KK · Manager</span>
              </div>
              <div className="dropdown-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </button>

            {isMenuOpen && (
              <div className="profile-dropdown">
                <button className="profile-dropdown-item " onClick={openProfile}>
                  <ProfileIcon /> Profile
                </button>
                <button className="profile-dropdown-item">
                  <LogoutIcon /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showProfile && <SideProfile />}
    </>
  );
};

export default Topbar;
