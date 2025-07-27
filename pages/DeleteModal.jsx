import { FaTrash, FaTimes } from 'react-icons/fa';

function DeleteModal({ 
  showDeleteConfirm, 
  productToDelete, 
  confirmDelete, 
  cancelDelete 
}) {
  if (!showDeleteConfirm) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-confirmation-modal">
        <div className="modal-header">
          <FaTrash className="modal-icon" />
          <h3>Delete Product</h3>
        </div>
        <div className="modal-content">
          <p>Are you sure you want to delete <strong>"{productToDelete?.name}"</strong>?</p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>
        <div className="modal-actions">
          <button className="cancel-delete-btn" onClick={cancelDelete}>
            <FaTimes />
            Cancel
          </button>
          <button className="confirm-delete-btn" onClick={confirmDelete}>
            <FaTrash />
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal; 