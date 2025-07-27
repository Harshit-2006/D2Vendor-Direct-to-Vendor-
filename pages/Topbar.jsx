import { FaUserCircle, FaBell, FaStore } from 'react-icons/fa';

function Topbar({ supplierName }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="brand-logo-placeholder">
          <FaStore className="brand-icon" />
        </div>
        <div className="greeting-section">
          <span className="greeting">Welcome back, <strong>{supplierName}</strong></span>
          <span className="greeting-subtitle">Manage your products and track orders</span>
        </div>
      </div>
      <div className="topbar-right">
        <div className="notification-bell">
          <FaBell className="bell-icon" />
          <span className="notification-badge">3</span>
        </div>
        <div className="profile-section">
          <FaUserCircle className="profile-icon" />
          <div className="profile-info">
            <span className="profile-name">{supplierName}</span>
            <span className="profile-role">Supplier</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar; 