
const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-right">
        <div className="help-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            <img src="https://ui-avatars.com/api/?name=Krishna+Kumar&background=E5E7EB&color=4B5563" alt="avatar" />
          </div>
          <div className="user-info">
            <span className="user-name">Krishna Kumar</span>
            <span className="user-role">KK · Manager</span>
          </div>
          <div className="dropdown-arrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
