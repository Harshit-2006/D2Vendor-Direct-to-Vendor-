import { useState } from 'react';
import './App.css';

// Import components
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import OrderHistory from './components/OrderHistory';
import MyProducts from './components/MyProducts';
import AddProduct from './components/AddProduct';
import DeleteModal from './components/DeleteModal';

// Import mock data
import { 
  mockOrders, 
  mockProducts, 
  timeFilters, 
  sortOptions, 
  categoryOptions, 
  addProductCategories 
} from './data/mockData';

function App() {
  const [selected, setSelected] = useState('orderHistory');
  const [timeFilter, setTimeFilter] = useState('lastDay');
  const [showDropdown, setShowDropdown] = useState(false);
  const [products, setProducts] = useState(mockProducts);
  const [editingPrice, setEditingPrice] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [sortBy, setSortBy] = useState('mostOrdered');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  // Add Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    price: '',
    category: '',
    inStock: true,
    brand: '',
    description: '',
    stock: ''
  });

  const supplierName = 'Supplier Name';

  const currentOrders = mockOrders[timeFilter];
  const totalRevenue = currentOrders.reduce((sum, order) => sum + order.amount, 0);

  // Filter and sort products based on selected criteria
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // First sort by stock status (in-stock first)
    filtered.sort((a, b) => {
      if (a.inStock && !b.inStock) return -1;
      if (!a.inStock && b.inStock) return 1;
      return 0;
    });

    // Then apply the selected sort criteria
    switch (sortBy) {
      case 'mostOrdered':
        filtered.sort((a, b) => b.orderCount - a.orderCount);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ratings':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const sortedProducts = getFilteredAndSortedProducts();

  const toggleStock = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, inStock: !product.inStock }
        : product
    ));
  };

  const startEditPrice = (product) => {
    setEditingPrice(product.id);
    setNewPrice(product.price.toString());
  };

  const savePrice = (productId) => {
    if (newPrice && !isNaN(newPrice)) {
      setProducts(products.map(product => 
        product.id === productId 
          ? { ...product, price: parseInt(newPrice) }
          : product
      ));
    }
    setEditingPrice(null);
    setNewPrice('');
  };

  const cancelEdit = () => {
    setEditingPrice(null);
    setNewPrice('');
  };

  // Add Product Functions
  const handleInputChange = (field, value) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if brand is required (not for fruits/vegetables)
    if (newProduct.category !== 'Fruits' && newProduct.category !== 'Vegetables' && !newProduct.brand) {
      alert('Please fill in all required fields');
      return;
    }

    const newProductData = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: parseInt(newProduct.price),
      originalPrice: parseInt(newProduct.price),
      rating: 0,
      reviews: 0,
      stock: parseInt(newProduct.stock) || 0,
      inStock: newProduct.inStock,
      orderCount: 0,
      image: newProduct.image || "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop",
      description: newProduct.description,
      ...(newProduct.category !== 'Fruits' && newProduct.category !== 'Vegetables' && { brand: newProduct.brand })
    };

    setProducts(prev => [...prev, newProductData]);
    
    // Reset form
    setNewProduct({
      name: '',
      image: '',
      price: '',
      category: '',
      inStock: true,
      brand: '',
      description: '',
      stock: ''
    });

    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 3000);
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      image: '',
      price: '',
      category: '',
      inStock: true,
      brand: '',
      description: '',
      stock: ''
    });
  };

  // Delete Product Functions
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  return (
    <div className="supplier-homepage-container">
      {/* Sidebar */}
      <Sidebar 
        selected={selected}
        setSelected={setSelected}
        products={products}
        currentOrders={currentOrders}
      />

      {/* Main Content */}
      <div className="main-content">
        <Topbar supplierName={supplierName} />

        <div className="content-area">
          {selected === 'orderHistory' && (
            <OrderHistory
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              currentOrders={currentOrders}
              totalRevenue={totalRevenue}
              expandedOrder={expandedOrder}
              setExpandedOrder={setExpandedOrder}
            />
          )}
          
          {selected === 'myProducts' && (
            <MyProducts
              sortedProducts={sortedProducts}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              showCategoryDropdown={showCategoryDropdown}
              setShowCategoryDropdown={setShowCategoryDropdown}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showSortDropdown={showSortDropdown}
              setShowSortDropdown={setShowSortDropdown}
              editingPrice={editingPrice}
              setEditingPrice={setEditingPrice}
              newPrice={newPrice}
              setNewPrice={setNewPrice}
              toggleStock={toggleStock}
              startEditPrice={startEditPrice}
              savePrice={savePrice}
              cancelEdit={cancelEdit}
              handleDeleteClick={handleDeleteClick}
            />
          )}
          
          {selected === 'addProduct' && (
            <AddProduct
              newProduct={newProduct}
              handleInputChange={handleInputChange}
              handleAddProduct={handleAddProduct}
              resetForm={resetForm}
              showAddSuccess={showAddSuccess}
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        showDeleteConfirm={showDeleteConfirm}
        productToDelete={productToDelete}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
    </div>
  );
}

export default App;
