// ✅ Updated productspage.jsx with improved logo styling

import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './productspage.css';

function ProductsPage() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passedProduct = location.state?.product;

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (passedProduct) {
      setItem({
        name: passedProduct.product_name,
        image: passedProduct.image_url,
        offers: passedProduct.prices.map(p => ({
          store_name: p.store_name,
          price: p.price,
          product_url: p.product_url || '#'
        }))
      });
    } else if (productId && productId !== 'undefined') {
      axios.get(`/api/products/${productId}`)
        .then(res => setItem(res.data))
        .catch(err => {
          console.error("Product fetch failed:", err);
          setError('Product not found or server error.');
        });
    } else {
      setError('Invalid product ID.');
    }
  }, [productId, passedProduct]);

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token && token !== "undefined" && token !== "null" && token.trim() !== "";
  };

  const redirectToLogin = () => {
    alert("Please log in to continue.");
    window.location.href = "/login";
  };

  if (error) return <p>{error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div className="product-page">
      <header className="App-header">
        <a href="/" className="header-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src="https://img.icons8.com/fluency/48/price-tag.png"
            alt="PriceScout Logo"
            style={{ height: '48px' }}
          />
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', color: '#1a237e' }}>PriceScout</h1>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>Find the best prices for your favorite products!</p>
          </div>
        </a>

        <div className="profile-icon" onClick={() => {
          if (!isLoggedIn()) {
            redirectToLogin();
          } else {
            window.location.href = "/profile";
          }
        }}>
          <h5>Profile</h5>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQEdoqnWbsHEyqwdFv4iUu5Ug5XpFZWFL5g&s" alt="Profile" />
        </div>
      </header>

      <h1>{item.name}</h1>
      {item.image && (
        <img src={item.image} alt={item.name} style={{ maxWidth: '300px', marginBottom: '20px' }} />
      )}
      <h2>Available Offers</h2>
      <ul>
        {item.offers.map((offer, index) => (
          <li key={index}>
            <strong>{offer.store_name}</strong> – ${parseFloat(offer.price).toFixed(2)} –{' '}
            <a href={offer.product_url} target="_blank" rel="noreferrer">Buy Now</a>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <p>&copy; 2025 PriceScout. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ProductsPage;