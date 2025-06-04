import React, { useState } from "react";
import "./Checkout.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// PUBLIC_INTERFACE
function Checkout({ items, onOrderComplete, onCancel }) {
  /** Handles checkout & Stripe payment. */
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Stub payment handler - will need actual Stripe backend integration for real charges
  const handlePlaceOrder = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!stripe || !elements) {
        setError("Stripe not loaded");
        setLoading(false);
        return;
      }
      // In production, call backend API to create payment intent and confirm with stripe.confirmCardPayment.
      setTimeout(() => {
        setLoading(false);
        onOrderComplete({ email, success: true, total });
      }, 1400);
    } catch (err) {
      setError("Payment failed!");
      setLoading(false);
    }
  };

  return (
    <div className="checkout-pane">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <div>
          <label htmlFor="checkout-email">Email:</label>
          <input
            id="checkout-email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label>Card Details</label>
          <div className="stripe-card-element">
            <CardElement />
          </div>
        </div>
        <div className="checkout-total">Total: <b>${total.toFixed(2)}</b></div>
        {error && <div className="checkout-error">{error}</div>}
        <button type="submit" className="btn btn-large checkout-pay-btn" disabled={loading}>
          {loading ? "Processing..." : "Pay & Place Order"}
        </button>
        <button className="btn btn-secondary" style={{marginTop: 8}} onClick={onCancel} disabled={loading}>Cancel</button>
      </form>
    </div>
  );
}

export default Checkout;
