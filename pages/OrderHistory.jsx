import { 
  FaClipboardList, 
  FaCalendarAlt, 
  FaChevronDown, 
  FaDollarSign, 
  FaShoppingCart, 
  FaStore, 
  FaBoxes, 
  FaChevronRight, 
  FaCreditCard, 
  FaCheckCircle, 
  FaClock, 
  FaTruck, 
  FaExclamationTriangle, 
  FaChartBar 
} from 'react-icons/fa';

const timeFilters = [
  { value: 'lastDay', label: 'Last Day' },
  { value: 'lastWeek', label: 'Last Week' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'lastYear', label: 'Last Year' }
];

function OrderHistory({ 
  timeFilter, 
  setTimeFilter, 
  showDropdown, 
  setShowDropdown, 
  currentOrders, 
  totalRevenue, 
  expandedOrder, 
  setExpandedOrder 
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'Processing': return '#f59e0b';
      case 'Shipped': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <FaCheckCircle />;
      case 'Processing': return <FaClock />;
      case 'Shipped': return <FaTruck />;
      default: return <FaExclamationTriangle />;
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="order-history-container">
      <div className="order-header">
        <div className="header-left">
          <h2><FaClipboardList className="header-icon" /> Order History</h2>
          <p className="header-subtitle">Track all your vendor orders and revenue</p>
        </div>
        <div className="time-filter-container">
          <button 
            className="time-filter-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaCalendarAlt />
            <span>{timeFilters.find(f => f.value === timeFilter)?.label}</span>
            <FaChevronDown className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`} />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              {timeFilters.map(filter => (
                <button
                  key={filter.value}
                  className={`dropdown-item ${timeFilter === filter.value ? 'active' : ''}`}
                  onClick={() => {
                    setTimeFilter(filter.value);
                    setShowDropdown(false);
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="revenue-card">
        <div className="revenue-icon">
          <FaDollarSign />
        </div>
        <div className="revenue-content">
          <h3>Total Revenue</h3>
          <p className="revenue-amount">₹{totalRevenue.toLocaleString()}</p>
          <p className="revenue-period">{timeFilters.find(f => f.value === timeFilter)?.label}</p>
        </div>
        <div className="revenue-chart">
          <FaChartBar className="chart-icon" />
        </div>
      </div>

      <div className="orders-section">
        <h3><FaShoppingCart className="section-icon" /> Transaction History</h3>
        <div className="orders-table">
          <div className="table-header">
            <div className="header-cell">Order ID</div>
            <div className="header-cell">Vendor</div>
            <div className="header-cell">Products</div>
            <div className="header-cell">Amount</div>
            <div className="header-cell">Date</div>
            <div className="header-cell">Status</div>
          </div>
          <div className="table-body">
            {currentOrders.map(order => (
              <div key={order.id} className="table-row">
                <div className="table-cell">#{order.id}</div>
                <div className="table-cell vendor-cell">
                  <FaStore className="vendor-icon" />
                  <span>{order.vendor}</span>
                </div>
                <div className="table-cell">
                  <button 
                    className="products-toggle-btn"
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    <FaBoxes className="products-icon" />
                    <span>{order.products.length} products</span>
                    <FaChevronRight className={`toggle-icon ${expandedOrder === order.id ? 'rotated' : ''}`} />
                  </button>
                  {expandedOrder === order.id && (
                    <div className="products-list">
                      {order.products.map((product, index) => (
                        <div key={index} className="product-item">
                          <span className="product-name">{product.name}</span>
                          <span className="product-quantity">Qty: {product.quantity}</span>
                          <span className="product-price">₹{product.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="table-cell amount-cell">
                  <FaCreditCard className="amount-icon" />
                  <span>₹{order.amount.toLocaleString()}</span>
                </div>
                <div className="table-cell date-cell">
                  <FaCalendarAlt className="date-icon" />
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="table-cell">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory; 