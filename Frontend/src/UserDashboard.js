import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './auth.css'; // Import the CSS file

const UserDashboard = () => {
  const products = [
    { id: 1, name: "Rawon Nusantara", price: 8.99, image: "https://asset.kompas.com/crops/RAkLCVPTiwC_qhG4W4wb1dN-uX4=/0x12:983x667/1200x800/data/photo/2023/11/17/6556dc6484a92.jpg?height=100&width=100" },
    { id: 2, name: "Pecel Tumpang", price: 2.49, image: "https://cdn.idntimes.com/content-images/community/2023/09/img-20230930-203702-7a1644e371f3e497fe40cd134675b078_600x400.jpg?height=100&width=100" },
    { id: 3, name: "Soto Lamongan", price: 3.99, image: "https://statik.tempo.co/data/2023/10/31/id_1250175/1250175_720.jpg?height=100&width=100" },
    { id: 4, name: "Kare Ayam", price: 3.79, image: "https://awsimages.detik.net.id/community/media/visual/2023/03/08/resep-kari-ayam-malaysia_43.jpeg?w=700&q=90?height=100&width=100" },
    { id: 5, name: "Cah Kangkung", price: 1.99, image: "https://awsimages.detik.net.id/community/media/visual/2023/07/11/resep-tumis-kangkung-saus-tiram-pedas_43.jpeg?w=700&q=90?height=100&width=100" },
    { id: 6, name: "Rendang Premium", price: 9.99, image: "https://asset.kompas.com/crops/QsUYn6p5xK4DsivCrxa0_TXdjuk=/10x36:890x623/1200x800/data/photo/2023/03/25/641e5ef63dea4.jpg?height=100&width=100" },
  ];

  const categories = ["Fruits & Vegetables", "Bakery", "Dairy & Eggs", "Meat & Seafood", "Pantry", "Frozen Foods"];
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email'); // Retrieve username
    if (storedEmail) {
      setEmail(storedEmail); // Set username in state
    }
  }, []);

  const userName = email.split("@")[0];

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">MealKit</h1>
            <nav>
              <ul className="nav-list">
                <li><a href="#" className="nav-link">Home</a></li>
                <li><a href="#" className="nav-link">Browse</a></li>
                <li><a href="#" className="nav-link">Recipes</a></li>
                <li><a href="#" className="nav-link">Meal Plans</a></li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <button className="icon-button">🔔</button>
            <button className="icon-button">🛒</button>
            <div className="avatar">U</div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="main-content">
          <div className="left-column">
            <h2 className="welcome-message">Welcome back, {userName}!</h2>
            <div className="card">
              <h3 className="card-title">Quick Shop</h3>
              <p className="card-description">Browse our categories or search for items</p>
              <div className="tabs">
                <button className="tab-button">Categories</button>
                <button className="tab-button">Search</button>
              </div>
              <div className="categories-grid">
                {categories.map((category) => (
                  <button key={category} className="category-button">{category}</button>
                ))}
              </div>
            </div>

            <h3 className="section-title">Featured Products</h3>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button className="add-to-cart-button">Add to Cart</button>
                </div>
              ))}
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <h3 className="card-title">Your Account</h3>
              <nav>
                <ul className="account-links">
                  <li><a href="#" className="account-link">👤 Profile</a></li>
                  <li><a href="#" className="account-link">🛒 Orders</a></li>
                  <Link to="/"> 🚪 Logout</Link>
                </ul>
              </nav>
            </div>

            <div className="card">
              <h3 className="card-title">Current Order</h3>
              <p className="order-summary">You have 3 items in your cart</p>
              <button className="view-cart-button">View Cart</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">About MealKit</h3>
            <p className="footer-text">MealKit is your one-stop shop for fresh, high-quality groceries delivered right to your door.</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Delivery Information</a></li>
              <li><a href="#" className="footer-link">Return Policy</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p className="footer-text">Stay updated with our latest offers and recipes!</p>
            <div className="newsletter">
              <input type="email" placeholder="Your email" className="newsletter-input" />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 MealKit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
