import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './HomePage.css';

const categories = [
  { name: 'All', image: '' }, // Added 'All' category
  { name: 'Mobiles', image: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png' },
  { name: 'Fashion', image: 'https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png' },
  { name: 'Electronics', image: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png' },
  { name: 'Home', image: 'https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.png' },
  { name: 'Appliances', image: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png' },
  { name: 'Travel', image: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png' },
  { name: 'Toys & More', image: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png' },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc'); // price-asc, price-desc, name-asc, name-desc
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    let tempProducts = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    // Sort products
    if (sortBy === 'price-asc') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(tempProducts);
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="home-page">
      <div className="container">
        <div className="categories-section">
          <ul className="category-list">
            {categories.map(category => (
              <li key={category.name} className="category-item" onClick={() => setSelectedCategory(category.name)}>
                <a href="#">
                  {category.image && <img src={category.image} alt={category.name} />}
                  <span>{category.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="banner-section">
          <img src="https://rukminim1.flixcart.com/flap/3376/560/image/0c203b2513b4282c.jpg" className="img-fluid" alt="Banner" />
        </div>

        <div className="deals-section">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Deals of the Day</h2>
            <div className="sort-options">
              <label htmlFor="sort">Sort By:</label>
              <select id="sort" className="form-select d-inline-block w-auto ms-2" onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>
          <div className="row">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100 product-card">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h5>
                    <p className="card-text">{`$${product.price.toFixed(2)}`}</p>
                    <button onClick={() => addToCart(product)} className="btn add-to-cart-btn mt-auto">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
