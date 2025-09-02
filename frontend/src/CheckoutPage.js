import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import './CheckoutPage.css'; // Import the CSS file

const CheckoutPage = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { clearCart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) {
    return (
      <div className="container mt-5 order-success-message">
        <h4 className="alert-heading">Thank you for your order!</h4>
        <p>Your order has been placed successfully. We will process it shortly.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container mt-5 checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Shipping Address</label>
            <textarea className="form-control" id="address" rows="3" required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="card" className="form-label">Credit Card</label>
            <input type="text" className="form-control" id="card" placeholder="XXXX-XXXX-XXXX-XXXX" required />
          </div>
          <button type="submit" className="btn place-order-btn">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;