import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductCatalog from './components/ProductCatalog';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

// Stripe.js initialization
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

// Note: For development/demo purpose, use Stripe test publishable key
const stripePromise = loadStripe("pk_test_SHOPEASE_DEMO_KEY_XYZ123"); // Replace with real key before production

const PRODUCTS = [
  {
    id: 1,
    name: "Kinetic Smart Watch",
    image: "https://images.unsplash.com/photo-1511381939415-c1d7ae955155?auto=format&fit=crop&w=400&q=80",
    price: 129.99,
    description: "Track your fitness and notifications with a sleek, water-resistant smart watch.",
  },
  {
    id: 2,
    name: "Wireless Pro Headphones",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    price: 79.99,
    description: "High-fidelity sound, noise cancellation, and long battery life for your commute.",
  },
  {
    id: 3,
    name: "Eco-Friendly Water Bottle",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: 24.99,
    description: "Keep hydrated with a BPA-free, reusable bottle available in multiple colors.",
  },
  {
    id: 4,
    name: "Travel Backpack",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: 56.49,
    description: "Versatile 35L backpack with laptop sleeve and anti-theft pockets.",
  }
];

function App() {
  // State for catalog, cart, UI modals, etc.
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const addToCart = (product, addAmount = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        const newArr = [...prev];
        newArr[idx] = { ...newArr[idx], quantity: newArr[idx].quantity + addAmount };
        return newArr;
      }
      return [...prev, { ...product, quantity: addAmount }];
    });
    setShowCart(true);
  };

  const updateCartItem = (productId, qty) => {
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, qty) } : item
    ));
  };

  const removeCartItem = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = (order) => {
    setOrderInfo(order);
    setShowCheckout(false);
    setCart([]);
  };

  const handleContinueShopping = () => {
    setOrderInfo(null);
    setShowCheckout(false);
    setShowDetails(false);
    setSelectedProduct(null);
    setShowCart(false);
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="app" style={{ background: "#F7FAFC", minHeight: "100vh" }}>
        <Navbar
          onCartClick={() => setShowCart(true)}
          cartCount={cart.reduce((sum, it) => sum + it.quantity, 0)}
        />

        <main>
          <div className="container" style={{ marginTop: 84, marginBottom: 34 }}>
            {!showCheckout && !orderInfo &&
              <ProductCatalog
                products={products}
                onSelectProduct={p => { setSelectedProduct(p); setShowDetails(true); }}
                onAddToCart={addToCart}
              />}
            
            {/* Modal: Product Details */}
            <ProductDetails
              product={selectedProduct}
              open={showDetails}
              onClose={() => setShowDetails(false)}
              onAddToCart={addToCart}
            />
            
            {/* Sidebar/modal: Cart */}
            <Cart
              items={cart}
              open={showCart}
              onClose={() => setShowCart(false)}
              onCheckout={handleCheckout}
              onUpdateItem={updateCartItem}
              onRemoveItem={removeCartItem}
            />

            {/* Page: Checkout */}
            {showCheckout && !orderInfo && (
              <Checkout
                items={cart}
                onOrderComplete={handleOrderComplete}
                onCancel={() => setShowCheckout(false)}
              />
            )}

            {/* Page: Confirmation */}
            {orderInfo && (
              <OrderConfirmation
                order={orderInfo}
                onContinue={handleContinueShopping}
              />
            )}
          </div>
        </main>
      </div>
    </Elements>
  );
}

export default App;