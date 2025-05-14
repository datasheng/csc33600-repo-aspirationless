import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./home.css"; // Assuming you have a CSS file for styling

function ItemBox({ product_ID, image, title, price, link, isAd = false }) {
    return (
        <div className={`item-box ${isAd ? "ad-item" : "product-item"}`}>
            <Link to={link || `/product/${product_ID}`} className="item-link">
                <img 
                    src={image || "https://via.placeholder.com/300"} 
                    alt={title || "No title available"} 
                    className="item-image" 
                />
                <div className="item-details">
                    <h3 className="item-title">{title || "No title available"}</h3>
                    {price && <p className="item-price">${parseFloat(price).toFixed(2)}</p>}
                </div>
            </Link>
        </div>
    );
}

export default ItemBox;