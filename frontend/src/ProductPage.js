import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import { CartContext } from './CartContext';
import './ProductPage.css'; // Import the CSS file

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts); // Set related products
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="row product-detail-card">
          <div className="col-md-5">
            <img src={product.image} className="product-detail-image" alt={product.name} />
          </div>
          <div className="col-md-7">
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>

            <div className="quantity-selector mb-3">
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>

            <button onClick={handleAddToCart} className="btn add-to-cart-btn-detail">Add to Cart</button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products-section mt-5">
            <h2>Related Products</h2>
            <div className="row">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="col-md-3 mb-4">
                  <div className="card h-100 product-card"> {/* Reusing product-card style */}
                    <Link to={`/product/${relatedProduct.id}`}>
                      <img src={relatedProduct.image} className="card-img-top" alt={relatedProduct.name} />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/product/${relatedProduct.id}`}>{relatedProduct.name}</Link>
                      </h5>
                      <p className="card-text">{`$${relatedProduct.price.toFixed(2)}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
