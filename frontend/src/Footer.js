import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>ABOUT</h5>
            <ul>
              <li><Link to="#">Contact Us</Link></li>
              <li><Link to="#">About Us</Link></li>
              <li><Link to="#">Careers</Link></li>
              <li><Link to="#">Flipkart Stories</Link></li>
              <li><Link to="#">Press</Link></li>
              <li><Link to="#">Flipkart Wholesale</Link></li>
              <li><Link to="#">Corporate Information</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>HELP</h5>
            <ul>
              <li><Link to="#">Payments</Link></li>
              <li><Link to="#">Shipping</Link></li>
              <li><Link to="#">Cancellation & Returns</Link></li>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Report Infringement</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>CONSUMER POLICY</h5>
            <ul>
              <li><Link to="#">Cancellation & Returns</Link></li>
              <li><Link to="#">Terms Of Use</Link></li>
              <li><Link to="#">Security</Link></li>
              <li><Link to="#">Privacy</Link></li>
              <li><Link to="#">Sitemap</Link></li>
              <li><Link to="#">EPR Compliance</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Mail Us:</h5>
            <p>
              {/* Keep this paragraph empty as requested */}
            </p>
          </div>
        </div>
        <hr />
        <div className="row copyright">
          <div className="col-md-6">
            <p>&copy; 2023 RS. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-end">
            <img src="https://static-assets-web.flixcart.com/fk-p-static/2020/08/payment-methods-fb076c.svg" alt="Payment Methods" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;