import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Header from './Header';
import HomePage from './HomePage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import Login from './Login';
import Register from './Register';
import ProfilePage from './ProfilePage';
import Footer from './Footer'; // Import Footer component

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer /> {/* Add Footer component */}
      </Router>
    </CartProvider>
  );
}

export default App;
