import React from "react";
import "./ProductCatalog.css";

// PUBLIC_INTERFACE
function ProductCatalog({ products, onSelectProduct, onAddToCart }) {
  /** Displays a grid of products with image, name, price, short desc, add-to-cart button */
  return (
    <div className="product-catalog-grid">
      {products.map(product => (
        <div className="product-card" key={product.id}>
          <img className="product-card-image" src={product.image} alt={product.name} />
          <div className="product-card-content">
            <div className="product-card-title">{product.name}</div>
            <div className="product-card-price">${product.price}</div>
            <div className="product-card-desc">{product.description}</div>
            <button
              className="btn btn-add-cart"
              onClick={() => onAddToCart(product)}
            >Add to Cart</button>
            <button
              className="btn btn-outline"
              onClick={() => onSelectProduct(product)}
            >View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCatalog;
