import React from "react";
import "./Navbar.css";

// PUBLIC_INTERFACE
function Navbar({ onCartClick, cartCount }) {
  /** Top navigation bar with logo and shopping cart icon/button. */
  return (
    <nav className="navbar-shop-ease">
      <div className="navbar-shop-ease-container">
        <div className="navbar-shop-ease-logo">
          <span className="navbar-logo-symbol">🛒</span>
          ShopEase
        </div>
        <div>
          <button className="navbar-shop-ease-cart-btn" onClick={onCartClick} aria-label="View cart">
            <span role="img" aria-label="cart">🛍️</span>
            {cartCount > 0 && (
              <span className="navbar-shop-ease-cart-count">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
