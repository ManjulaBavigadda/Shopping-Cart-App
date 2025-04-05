import React from 'react';
import './Cart.css';

const Cart = ({ items, subtotal, onUpdateQuantity, onRemoveItem, freeGift }) => {
  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      
      {items.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {items.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">₹{item.price}</span>
                </div>
                
                {item.id !== freeGift.id ? (
                  <div className="cart-item-controls">
                    <div className="cart-quantity-selector">
                      <button 
                        className="quantity-btn decrease" 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn increase" 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-item-btn" 
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="free-gift-label">Free Gift</div>
                )}
              </li>
            ))}
          </ul>
          
          <div className="cart-summary">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;