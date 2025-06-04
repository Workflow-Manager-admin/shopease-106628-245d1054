import React from "react";
import "./ProductDetails.css";

// PUBLIC_INTERFACE
function ProductDetails({ product, open, onClose, onAddToCart }) {
  /** Displays details of a single product in a modal/pane. */
  if (!open || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-details" onClick={e => e.stopPropagation()}>
        <img className="modal-details-image" src={product.image} alt={product.name} />
        <div className="modal-details-content">
          <h2>{product.name}</h2>
          <div className="modal-details-price">${product.price}</div>
          <div className="modal-details-desc">{product.description}</div>
          <button className="btn" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
