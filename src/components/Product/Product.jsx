import React, { useState } from 'react';
import './Product.css';

const Product = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    setQuantity(1);
  };

  return (
    <div className="product-card">
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
      </div>
      <div className="quantity-selector">
        <button 
          className="quantity-btn decrease" 
          onClick={handleDecrease}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="quantity-value">{quantity}</span>
        <button 
          className="quantity-btn increase" 
          onClick={handleIncrease}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button 
        className="add-to-cart-btn" 
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;