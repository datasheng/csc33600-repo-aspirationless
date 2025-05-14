import "./search-history.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [user, setUser] = useState(null);

  // Reusable data fetch function with filter
  const fetchData = async (filter = "desc", user_ID = 1) => {
    setProducts([]);
    try {
      const res = await axios.get(
        `http://localhost:8800/api/search_history/searched?sort=${filter}`,
        { headers: { "x-user-id": user_ID } }
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Unable to fetch data.");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("User not logged in.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetchData("desc", parsedUser.user_ID); // Initial fetch with default sorting
  }, []);

  const filteredItems = getFilteredItems(query, products);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <nav className="main-navbar">
        <ul>
          <li><a href="/">PRICE SCOUT</a></li>
          <li><a href="/search">PRODUCTS</a></li>
          {localStorage.getItem("user") ? (
            <li><a href="/profile">PROFILE</a></li>
          ) : (
            <li><a href="/login">LOGIN</a></li>
          )}
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
              <label htmlFor="filterSelect">Sort by:</label>
              <select
                id="filterSelect"
                onChange={(e) => {
                  setQuery("");
                  setCurrentPage(1);
                  if (user) {
                    fetchData(e.target.value, user.user_ID);
                  }
                }}
                className="filter-dropdown"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
                <option value="price">Current Price (High to Low)</option>
                <option value="store">Store Name (Z-A)</option>
              </select>
            </div>

            <div className="H-itemlog">
              <ul className="H-itemlog">
                {currentItems.length > 0 ? (
                  currentItems.map(item => (
                    <li key={item.search_ID} className="H_list">
                      <div className="H_itemtitleprice">
                        <div><strong>{item.product_name}</strong></div>
                        <div><strong>${item.price}</strong></div>
                      </div>
                      <div>Searched by {item.user_name}</div>
                      <div>on {new Date(item.search_date).toLocaleDateString()}</div>
                    </li>
                  ))
                ) : (
                  <li>No search history found.</li>
                )}
                {totalPages > 1 && (
                  <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
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
