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
    const [hotProducts, setHotProducts] = useState([]);
    const [topDeals, setTopDeals] = useState([]);

    // Check if the user is logged in
    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        return token && token !== "undefined" && token !== "null" && token.trim() !== "";
    };

    // Redirect to login if not logged in
    const redirectToLogin = () => {
        alert("Please log in to continue.");
        window.location.href = "/login";
    };

    // Fetch ads
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

    // Fetch products (Hot and Top Deals)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [hotResponse, topResponse] = await Promise.all([
                    fetch("http://localhost:8800/api/products/hot-products"),
                    fetch("http://localhost:8800/api/products/top-deals")
                ]);

                if (!hotResponse.ok || !topResponse.ok) {
                    console.error("Failed to fetch products from the server");
                    return;
                }

                const hotData = await hotResponse.json();
                const topData = await topResponse.json();

                console.log("Hot Products:", hotData);
                console.log("Top Deals:", topData);

                setHotProducts(hotData);
                setTopDeals(topData);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Handle product search
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

    // Carousel helper functions
    const rotateLeft = (items, setIndex, index) => {
        setIndex((index - 1 + items.length) % items.length);
    };

    const rotateRight = (items, setIndex, index) => {
        setIndex((index + 1) % items.length);
    };

    const getVisibleItems = (items, index) => {
        const visibleItems = [];
        for (let i = 0; i < Math.min(3, items.length); i++) {
            visibleItems.push(items[(index + i) % items.length]);
        }
        return visibleItems;
    };

    return (
        <div className="App">
            <header className="App-header">
                <a href="/" className="header-link">
                    <h1>PriceScout</h1>
                    <p>Find the best prices for your favorite products!</p>
                </a>

                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search for a product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>

                <div 
                    className="advanced-search-button" 
                    onClick={() => {
                        if (!isLoggedIn()) {
                            redirectToLogin();
                        } else {
                            window.location.href = "/search";
                        }
                    }}
                >
                    <h5>Power Search</h5>
                </div>

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
                {ads.map((ad, index) => (
                    <div 
                        key={ad.ad_ID} 
                        className={`floating-ad ${index % 2 === 0 ? "left" : "right"}`} 
                        style={{ top: `${100 + (index / 2) * 320}px` }}
                    >
                        <button 
                            className="close-button" 
                            onClick={() => setAds((prevAds) => prevAds.filter(a => a.ad_ID !== ad.ad_ID))}
                        >
                            ✖
                        </button>
                        <a 
                            href={ad.target_link || "#"} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="ad-link"
                        >
                            <img 
                                src={ad.image_url || "https://via.placeholder.com/180"} 
                                alt={ad.description || "Ad"} 
                                className="ad-image"
                            />
                            <h4 className="ad-description">
                                {ad.description || "Check this out!"}
                            </h4>
                        </a>

                    </div>
                ))}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!showResults && (
                <>
                    <section className="carousel-section">
                        <h2>🔥 Trending Now</h2>
                        <div className="carousel">
                            <button className="arrow left" onClick={() => rotateLeft(hotProducts, setHotIndex, hotIndex)}>◀</button>
                            <div className="carousel-items">
                                {getVisibleItems(hotProducts, hotIndex).map((item) => (
                                    <ItemBox key={item.product_ID} image={item.image_url} title={item.product_name} price={`$${parseFloat(item.price).toFixed(2)}`} />
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
                                    <ItemBox key={item.product_ID} image={item.image_url} title={item.product_name} price={`$${parseFloat(item.price).toFixed(2)}`} />
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
