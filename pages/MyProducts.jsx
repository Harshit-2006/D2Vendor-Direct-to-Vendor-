import { 
  FaBoxOpen, 
  FaFilter, 
  FaChevronDown, 
  FaSort, 
  FaBoxes, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaShoppingCart, 
  FaStar, 
  FaEdit, 
  FaToggleOn, 
  FaToggleOff, 
  FaTrash, 
  FaSave, 
  FaTimes 
} from 'react-icons/fa';

const sortOptions = [
  { value: 'mostOrdered', label: 'Most Ordered' },
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'ratings', label: 'Highest Rated' }
];

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Vegetables', label: 'Vegetables' },
  { value: 'Dairy', label: 'Dairy' },
  { value: 'Fruits', label: 'Fruits' },
  { value: 'Spices', label: 'Spices' }
];

function MyProducts({ 
  sortedProducts, 
  selectedCategory, 
  setSelectedCategory, 
  showCategoryDropdown, 
  setShowCategoryDropdown, 
  sortBy, 
  setSortBy, 
  showSortDropdown, 
  setShowSortDropdown, 
  editingPrice, 
  setEditingPrice, 
  newPrice, 
  setNewPrice, 
  toggleStock, 
  startEditPrice, 
  savePrice, 
  cancelEdit, 
  handleDeleteClick 
}) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= rating ? 'star filled' : 'star empty'} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <div className="header-left">
          <h2><FaBoxOpen className="header-icon" /> My Products</h2>
          <p className="header-subtitle">Manage your product inventory and pricing</p>
        </div>
        <div className="products-controls">
          <div className="filter-controls">
            <div className="category-filter-container">
              <button 
                className="category-filter-btn"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <FaFilter />
                <span>{categoryOptions.find(c => c.value === selectedCategory)?.label}</span>
                <FaChevronDown className={`dropdown-arrow ${showCategoryDropdown ? 'rotated' : ''}`} />
              </button>
              {showCategoryDropdown && (
                <div className="dropdown-menu">
                  {categoryOptions.map(option => (
                    <button
                      key={option.value}
                      className={`dropdown-item ${selectedCategory === option.value ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategory(option.value);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="sort-filter-container">
              <button 
                className="sort-filter-btn"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <FaSort />
                <span>Sort by: {sortOptions.find(s => s.value === sortBy)?.label}</span>
                <FaChevronDown className={`dropdown-arrow ${showSortDropdown ? 'rotated' : ''}`} />
              </button>
              {showSortDropdown && (
                <div className="dropdown-menu">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      className={`dropdown-item ${sortBy === option.value ? 'active' : ''}`}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="products-stats">
            <span className="stat-item">
              <FaBoxes className="stat-icon" />
              <strong>{sortedProducts.length}</strong> Products
            </span>
            <span className="stat-item">
              <FaCheckCircle className="stat-icon" />
              <strong>{sortedProducts.filter(p => p.inStock).length}</strong> In Stock
            </span>
            <span className="stat-item">
              <FaExclamationTriangle className="stat-icon" />
              <strong>{sortedProducts.filter(p => !p.inStock).length}</strong> Out of Stock
            </span>
          </div>
        </div>
      </div>
      
      <div className="products-grid">
        {sortedProducts.map(product => (
          <div key={product.id} className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-category">{product.category}</div>
              <div className="order-count-badge">
                <FaShoppingCart className="badge-icon" />
                <span>{product.orderCount} orders</span>
              </div>
            </div>
            
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
              </div>
              
              <div className="product-price-section">
                <div className="price-container">
                  {editingPrice === product.id ? (
                    <div className="price-edit">
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="price-input"
                        placeholder="Enter new price"
                      />
                      <div className="price-actions">
                        <button 
                          className="save-btn"
                          onClick={() => savePrice(product.id)}
                        >
                          <FaSave />
                          Save
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={cancelEdit}
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="price-display">
                      <span className="current-price">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                      <div className="price-actions-buttons">
                        <button 
                          className="edit-price-btn"
                          onClick={() => startEditPrice(product)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="delete-product-btn"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="product-actions">
                  <div className="stock-toggle">
                    <span className="stock-label">Stock:</span>
                    <button 
                      className={`toggle-btn ${product.inStock ? 'active' : 'inactive'}`}
                      onClick={() => toggleStock(product.id)}
                    >
                      {product.inStock ? <FaToggleOn /> : <FaToggleOff />}
                      <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProducts; 