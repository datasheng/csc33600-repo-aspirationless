<<<<<<< HEAD

import "./search-history.css"; // Assuming you have a CSS file for styling
import ReactDOM from "react-dom/client";
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:8800/api/users/login", { email, password });
            console.log(res.data);

            alert("Login successful!");

            // Save user info in localStorage (optional)
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // Redirect to home page or dashboard (optional)
            // window.location.href = "/";

        } catch (err) {
            console.error(err);
            const backendMessage = err.response?.data;
            if (typeof backendMessage === 'string') {
                setError(backendMessage);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="main-container">
            <div className="searchhistory-card">
                <div className="H-searchtop">
                    <h2 className="history-title">Items History</h2>
                    <div className="searchbar-and-button">

                        <div className="H-searchbar"> 
                            <form className="history-searchbox" onSubmit={handleLogin}>
                                <input
                                    type="email"
                                    placeholder="enter item name"
                                    className="item-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </form>
                        </div>
                        
                        <div className="H-searchbutton">
                            <button type="submit" className="searchhistory-button">search</button>
                        </div>
                        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
                    </div>
                </div>

                <div className="H-searchbody">
                    <div className="H-filterbody">

                    </div>
                    <div className="H-itemlog">

                    </div>
                </div>


                <div className="history-footer">
                    no history with this item <a href="/signup">Sign Up</a> 
                </div>
            </div>
        </div>
    );
}

export default Login;
=======
import "./search-history.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

// Filter logic
const getFilteredItems = (query, items) => {
  if (!query) return items;
  return items.filter((e) =>
    e.product_name.toLowerCase().includes(query.toLowerCase())
  );
};

function Shpage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  // Fetch products on load
  useEffect(() => {
    const fetchData = async (userof) => {
      try {
        const res = await axios.get('http://localhost:8800/api/search_history/searched', 
            { headers: { 'x-username': 'Alice Johnson' }}); // PASS USERNAME DATA        
            setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchData();
  }, []);

  const filteredItems = getFilteredItems(query, products);

  // Optional search handler (not needed for filter-only search)
  const handleSearch = async (e) => {
    e.preventDefault();
    // Optionally handle backend filtering/search here
    // Currently unused
  };

  return (
    <div>
      <nav className="main-navbar">
        <ul>
          <li><a>HOME</a></li>
          <li><a>PRODUCTS</a></li>
          <li><a>HISTORY</a></li>
          <li><a>b</a></li>
          <li><a>PROFILE</a></li>
        </ul>
      </nav>

      <div className="main-container">
        <div className="searchhistory-card">
          <div className="H-searchtop">
            <h2 className="history-title">Items History</h2>
            <form className="searchbar-and-button" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Enter item name"
                className="item-input"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <div className="H-searchbutton">
                <button type="submit" className="searchhistory-button">Search</button>
              </div>
              {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
            </form>
          </div>

          <div className="H-searchbody">
            <div className="H-filterbody">
              {/* Future filters can go here */}
              <p>Filter section</p>
            </div>

            <div className="H-itemlog">
              <ul className="H-itemlog">
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <li key={item.search_ID} className="H_list">
                        <div>
                            <strong>{item.product_name}</strong> 
                        </div>
                        <div>
                            <strong>{item.price}</strong> 
                        </div>
                        <div>
                            Searched by {item.user_name} 
                        </div> 
                        <div>
                            on {new Date(item.search_date).toLocaleDateString()}
                        </div>
                    </li>
                  ))
                ) : (
                  <li>No search history found.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="history-footer">
            No history with this item? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shpage;
>>>>>>> origin/ethan
