import React from "react";
import "./Cart.css";

// PUBLIC_INTERFACE
function Cart({ items, open, onClose, onCheckout, onUpdateItem, onRemoveItem }) {
  /** Sidebar/modal for viewing and interacting with cart items. */
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!open) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
        <h2>Shopping Cart</h2>
        {items.length === 0 ? <div className="cart-empty">Your cart is empty 🌱</div>
        : (
          <div className="cart-items-list">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price} x</div>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    className="cart-item-quantity-input"
                    onChange={e => onUpdateItem(item.id, parseInt(e.target.value) || 1)}
                  />
                  <button className="cart-item-remove-btn" onClick={() => onRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cart-total">Total: <b>${total.toFixed(2)}</b></div>
        <button className="btn btn-large cart-checkout-btn" onClick={onCheckout} disabled={!items.length}>
          Checkout
        </button>
        <button className="btn btn-secondary" style={{marginTop: 8}} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Cart;
