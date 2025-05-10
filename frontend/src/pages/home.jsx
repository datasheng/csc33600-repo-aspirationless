import React, { useState, useEffect } from "react";
import "./home.css";
import ItemBox from "./itembox";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hotIndex, setHotIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);

  // Sample Hot Products and Top Deals
  const hotProducts = [
    { id: 1, image: "https://newworld.co.za/cdn/shop/products/1_1b05e890-af71-47d9-b76b-0e5674a44d60.webp?v=1736979562", title: "Hot Product 1", price: 19.99 },
    { id: 2, image: "https://newworld.co.za/cdn/shop/products/1_1b05e890-af71-47d9-b76b-0e5674a44d60.webp?v=1736979562", title: "Hot Product 2", price: 29.99 },
    { id: 3, image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/140bc1b42e824d8bb715ebf456a4b65e_9366/Ultraboost_1.0_Shoes_Black_HQ4204_HM1.jpg", title: "Hot Product 3", price: 39.99 },
    { id: 4, image: "https://newworld.co.za/cdn/shop/products/1_1b05e890-af71-47d9-b76b-0e5674a44d60.webp?v=1736979562", title: "Hot Product 4", price: 49.99 },
    { id: 5, image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/140bc1b42e824d8bb715ebf456a4b65e_9366/Ultraboost_1.0_Shoes_Black_HQ4204_HM1.jpg", title: "Hot Product 5", price: 59.99 },
  ];

  const topDeals = [
    { id: 6, image: "https://newworld.co.za/cdn/shop/products/1_1b05e890-af71-47d9-b76b-0e5674a44d60.webp?v=1736979562", title: "Top Deal 1", price: 39.99 },
    { id: 7, image: "https://newworld.co.za/cdn/shop/products/1_1b05e890-af71-47d9-b76b-0e5674a44d60.webp?v=1736979562", title: "Top Deal 2", price: 49.99 },
    { id: 8, image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/140bc1b42e824d8bb715ebf456a4b65e_9366/Ultraboost_1.0_Shoes_Black_HQ4204_HM1.jpg", title: "Top Deal 3", price: 59.99 },
    { id: 9, image: "https://newworld.co.za/cdn/shop/products/1_1b05e890-af71-47d9-b76b-0e5674a44d60.webp?v=1736979562", title: "Top Deal 4", price: 69.99 },
    { id: 10, image: "https://newworld.co.za/cdn/shop/products/1_1b05e890-af71-47d9-b76b-0e5674a44d60.webp?v=1736979562", title: "Top Deal 5", price: 79.99 },
  ];

  // Search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:8800/api/products/search?q=${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
        setShowResults(true);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const rotateLeft = (items, setIndex, index) => {
    setIndex((index - 1 + items.length) % items.length);
  };

  const rotateRight = (items, setIndex, index) => {
    setIndex((index + 1) % items.length);
  };

  const getVisibleItems = (items, index) => {
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      visibleItems.push(items[(index + i) % items.length]);
    }
    return visibleItems;
  };

  return (
    <div className="App">
      <header className="App-header">
        <a href="/" className="header-link">
          <h1>
            PriceScout
            <p>Find the best prices for your favorite products!</p>
          </h1>
        </a>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Profile Icon */}
        <div className="profile-icon">
          <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="Profile" />
        </div>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {showResults ? (
      <section className="filtered-results">
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div key={item.product_ID} className="search-result-item">
              <img src={item.image_url || "placeholder.jpg"} alt={item.product_name} />
              <div className="search-result-details">
                <h3>{item.product_name}</h3>
                <p>{item.brand}</p>
                <button>View Product</button>
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </section>
      ) : (
        <>
          <section className="carousel-section">
            <h2>🔥 Trending Now</h2>
            <div className="carousel">
              <button className="arrow left" onClick={() => rotateLeft(hotProducts, setHotIndex, hotIndex)}>◀</button>
              <div className="carousel-items">
                {getVisibleItems(hotProducts, hotIndex).map((item) => (
                  <ItemBox key={item.id} image={item.image} title={item.title} price={item.price} />
                ))}
              </div>
              <button className="arrow right" onClick={() => rotateRight(hotProducts, setHotIndex, hotIndex)}>▶</button>
            </div>
          </section>

          <section className="carousel-section">
            <h2>🏆 Today’s Top Picks</h2>
            <div className="carousel">
              <button className="arrow left" onClick={() => rotateLeft(topDeals, setTopIndex, topIndex)}>◀</button>
              <div className="carousel-items">
                {getVisibleItems(topDeals, topIndex).map((item) => (
                  <ItemBox key={item.id} image={item.image} title={item.title} price={item.price} />
                ))}
              </div>
              <button className="arrow right" onClick={() => rotateRight(topDeals, setTopIndex, topIndex)}>▶</button>
            </div>
          </section>
        </>
      )}

      <footer className="footer">
        <p>&copy; 2025 PriceScout. All rights reserved.</p>
        <p>Contact us: 646-123-4567</p>
        <p>Email: pricescout@gmail.com</p>
      </footer>
    </div>
  );
}

export default Home;