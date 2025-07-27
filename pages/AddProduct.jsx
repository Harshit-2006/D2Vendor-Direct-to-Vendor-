import { 
  FaPlusSquare, 
  FaBoxOpen, 
  FaFilter, 
  FaDollarSign, 
  FaBoxes, 
  FaUpload, 
  FaStore, 
  FaInfoCircle, 
  FaToggleOn, 
  FaSave, 
  FaTimes, 
  FaCheckCircle 
} from 'react-icons/fa';

const addProductCategories = [
  { value: 'Vegetables', label: 'Vegetables' },
  { value: 'Dairy', label: 'Dairy' },
  { value: 'Fruits', label: 'Fruits' },
  { value: 'Spices', label: 'Spices' }
];

function AddProduct({ 
  newProduct, 
  handleInputChange, 
  handleAddProduct, 
  resetForm, 
  showAddSuccess 
}) {
  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h2><FaPlusSquare className="header-icon" /> Add New Product</h2>
        <p>Fill in the details below to add a new product to your inventory</p>
      </div>

      {showAddSuccess && (
        <div className="success-message">
          <FaCheckCircle />
          <span>Product added successfully!</span>
        </div>
      )}

      <div className="add-product-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productName">
              <FaBoxOpen className="label-icon" />
              Product Name *
            </label>
            <input
              type="text"
              id="productName"
              value={newProduct.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter product name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productCategory">
              <FaFilter className="label-icon" />
              Category *
            </label>
            <select
              id="productCategory"
              value={newProduct.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="form-input"
            >
              <option value="">Select Category</option>
              {addProductCategories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productPrice">
              <FaDollarSign className="label-icon" />
              Price (₹) *
            </label>
            <input
              type="number"
              id="productPrice"
              value={newProduct.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="Enter price"
              className="form-input"
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productStock">
              <FaBoxes className="label-icon" />
              Stock Quantity
            </label>
            <input
              type="number"
              id="productStock"
              value={newProduct.stock}
              onChange={(e) => handleInputChange('stock', e.target.value)}
              placeholder="Enter stock quantity"
              className="form-input"
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productImage">
              <FaUpload className="label-icon" />
              Product Image URL
            </label>
            <div className="image-input-container">
              <input
                type="url"
                id="productImage"
                value={newProduct.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="Enter image URL"
                className="form-input"
              />
              <FaUpload className="upload-icon" />
            </div>
          </div>
          {newProduct.category !== 'Fruits' && newProduct.category !== 'Vegetables' && (
            <div className="form-group">
              <label htmlFor="productBrand">
                <FaStore className="label-icon" />
                Brand *
              </label>
              <input
                type="text"
                id="productBrand"
                value={newProduct.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="Enter brand name"
                className="form-input"
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">
            <FaInfoCircle className="label-icon" />
            Description *
          </label>
          <textarea
            id="productDescription"
            value={newProduct.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter product description"
            className="form-textarea"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={newProduct.inStock}
              onChange={(e) => handleInputChange('inStock', e.target.checked)}
              className="form-checkbox"
            />
            <FaToggleOn className="checkbox-icon" />
            <span>In Stock</span>
          </label>
        </div>

        <div className="form-actions">
          <button 
            className="add-product-btn"
            onClick={handleAddProduct}
          >
            <FaSave />
            Add Product
          </button>
          <button 
            className="reset-btn"
            onClick={resetForm}
          >
            <FaTimes />
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct; 