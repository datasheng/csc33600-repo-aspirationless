import React from "react";
import "./ad.css";

function Ad({ adId, imageUrl, targetLink, description, onRemove }) {
    const handleRemoveClick = (event) => {
        event.preventDefault(); // Prevent link click
        if (onRemove) onRemove(adId);
    };

    return (
        <div className="ad-container">
            <button className="ad-close-button" onClick={handleRemoveClick}>✖</button>
            <a href={targetLink} target="_blank" rel="noopener noreferrer" className="ad-card">
                <img src={imageUrl} alt={description} className="ad-image" />
                <div className="ad-content">
                    <p className="ad-description">{description}</p>
                    <button className="ad-cta">Shop Now</button>
                </div>
            </a>
        </div>
    );
}

export default Ad;