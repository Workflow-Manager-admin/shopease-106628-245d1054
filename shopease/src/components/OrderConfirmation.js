import React from "react";

// PUBLIC_INTERFACE
function OrderConfirmation({ order, onContinue }) {
  /** Order confirmation with summary after payment. */
  return (
    <div className="order-confirmation-pane">
      <h2>Thank you!</h2>
      <p>Your payment of <b>${order.total.toFixed(2)}</b> was successful.</p>
      <p>A receipt has been sent to {order.email}.</p>
      <button className="btn btn-large" onClick={onContinue}>Continue Shopping</button>
    </div>
  );
}

export default OrderConfirmation;
