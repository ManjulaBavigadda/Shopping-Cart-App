import React, { useState, useEffect } from 'react';
import Product from '../components/Product/Product';
import Cart from '../components/Cart/Cart';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import Notification from '../components/Notification/Notification';
import './Home.css';

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const progress = Math.min((subtotal / THRESHOLD) * 100, 100);
  const hasFreeGift = cartItems.some(item => item.id === FREE_GIFT.id);

  useEffect(() => {
    if (subtotal >= THRESHOLD && !hasFreeGift) {
      setCartItems([...cartItems, { ...FREE_GIFT, quantity: 1 }]);
      setNotificationMessage(`Congratulations! You've earned a free ${FREE_GIFT.name}!`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else if (subtotal < THRESHOLD && hasFreeGift) {
      setCartItems(cartItems.filter(item => item.id !== FREE_GIFT.id));
      setNotificationMessage(`Free gift removed as your order is below ₹${THRESHOLD}`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  }, [subtotal, hasFreeGift]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <div className="home-container">
      <h1 className="store-title">ElectroShop</h1>
      
      <ProgressBar progress={progress} threshold={THRESHOLD} />
      
      {showNotification && (
        <Notification message={notificationMessage} />
      )}
      
      <div className="products-section">
        <h2>Products</h2>
        <div className="products-grid">
          {PRODUCTS.map(product => (
            <Product 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
      
      <Cart 
        items={cartItems} 
        subtotal={subtotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        freeGift={FREE_GIFT}
      />
    </div>
  );
};

export default Home;