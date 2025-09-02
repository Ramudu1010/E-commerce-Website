import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
          <img src="/logo.svg" alt="RS Logo" width="50" height="50" className="me-2" />
          <h1>RS</h1>
        </Link>
        <div className="input-group w-50">
          <input type="text" className="form-control" placeholder="Search for products, brands and more" />
          <button className="btn btn-light" type="button">Search</button>
        </div>
        <div>
          <Link to="/cart" className="btn btn-light position-relative">
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              0
            </span>
          </Link>
          <Link to="/login" className="btn btn-light ms-2">Login</Link>
          <Link to="/register" className="btn btn-light ms-2">Register</Link>
          <Link to="/profile" className="btn btn-light ms-2">Profile</Link> {/* Added Profile link */}
        </div>
      </div>
    </header>
  );
};

export default Header;