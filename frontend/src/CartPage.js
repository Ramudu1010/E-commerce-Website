import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './CartPage.css'; // Import the CSS file

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="row">
              <div className="col-md-9">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <span className="cart-item-name">{item.name}</span>
                          </div>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <input type="text" value={item.quantity} readOnly />
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                          </div>
                        </td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button onClick={() => removeFromCart(item.id)} className="btn remove-item-btn">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-3">
                <div className="cart-summary">
                  <h3>PRICE DETAILS</h3>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Price ({cart.length} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Delivery Charges</span>
                    <span>FREE</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between cart-total">
                    <span>Total Payable</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" className="btn checkout-btn w-100">Proceed to Checkout</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;