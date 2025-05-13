import React, { useState, useEffect } from "react";
import "./home.css";
import ItemBox from "./itembox";
import Ad from "./ad";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hotIndex, setHotIndex] = useState(0);
    const [topIndex, setTopIndex] = useState(0);
    const [ads, setAds] = useState([]);

    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        return token && token !== "undefined" && token !== "null" && token.trim() !== "";
    };

    const redirectToLogin = () => {
        alert("Please log in to continue.");
        window.location.href = "/login";
    };

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const userData = localStorage.getItem("user");
                if (!userData || (userData && JSON.parse(userData).subscription_status === "free")) {
                    const response = await fetch("http://localhost:8800/api/products/random");
                    const adData = await response.json();
                    setAds(adData);
                }
            } catch (error) {
                console.error("Failed to fetch ads:", error);
            }
        };

        fetchAds();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!isLoggedIn()) {
            redirectToLogin();
            return;
        }

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

    const handleRemoveAd = (adId) => {
        setAds((prevAds) => prevAds.filter((ad) => ad.ad_ID !== adId));
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

    return (
        <div className="App">
            <header className="App-header">
                <a href="/" className="header-link">
                    <h1>PriceScout</h1>
                    <p>Find the best prices for your favorite products!</p>
                </a>

                <form onSubmit={handleSearch} className="search-form">
                    <input type="text" placeholder="Search for a product..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button type="submit">Search</button>
                </form>

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

            <div className="ads-section">
                {Array.isArray(ads) && ads.map((ad, index) => {
                    const isLeft = index % 2 === 0;
                    const positionIndex = Math.floor(index / 2);
                    const topOffset = 100 + (positionIndex * 320);

                    return (
                        <div 
                            key={ad.ad_ID} 
                            className={`floating-ad ${isLeft ? "left" : "right"}`} 
                            style={{ top: `${topOffset}px` }}
                        >
                            <button 
                                className="close-button" 
                                onClick={() => setAds((prevAds) => prevAds.filter(a => a.ad_ID !== ad.ad_ID))}
                            >
                                ✖
                            </button>
                            <img src={ad.image_url || "https://via.placeholder.com/180"} alt="Ad" />
                        </div>
                    );
                })}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {showResults ? (
                <section className="item-section">
                    <h2>Search Results</h2>
                    {searchResults.length > 0 ? (
                        <div className="item-box-container">
                            {searchResults.map((item) => (
                                <ItemBox
                                    key={item.product_ID}
                                    image={item.image_url || "https://via.placeholder.com/300"}
                                    title={item.product_name}
                                    price={item.brand || "No brand available"}
                                />
                            ))}
                        </div>
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
            </footer>
        </div>
    );
}

export default Home;
