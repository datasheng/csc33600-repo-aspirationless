
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

