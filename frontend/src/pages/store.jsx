import "./store.css";
import { useEffect, useState } from "react";
import axios from "axios";

function StorePage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:8800/api/store/get-current");
        console.log("Fetched items:", res.data); // Debug
        setItems(res.data); // Replaces, not appends
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products.");
      }
    };

    fetchData();
  }, []); 
  
  const filteredItems = query.trim()
    ? items.filter(item =>
        item.product_name?.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);



  ///
  const [product_name, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [model_number, setModelNumber] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [category_ID, setCategoryID] = useState("");
  const [price, setPrice] = useState("");
  const [store_ID, setStoreID] = useState("");
  const [product_link, setProductLink] = useState("");
  const [affiliate_link, setAffiliateLink] = useState("");
  
    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8800/api/store/add-product", {
                product_name,
                brand,
                model_number,
                description,
                image_url,
                category_ID: parseInt(category_ID),
                price: parseFloat(price),
                store_ID: parseInt(store_ID),
                product_link,
                affiliate_link,
                });

                alert("Product added!");
                setItems(prev => [...prev, res.data]); // optionally refresh list
            } catch (err) {
                console.error("Failed to add product:", err);
                setError("Could not add product.");
        }
    };



    //// 
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
  
    try {
      await axios.delete(`http://localhost:8800/api/store/delete-product/${productId}`);
  
      setItems(prevItems => prevItems.filter(item => item.product_ID !== productId));
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError("Could not delete product.");
    }
  };
  
  return (
    <div>
      <nav className="store-navbar">
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

      <div className="store-container">
        <div className="store-card">
          <div className="store-searchtop">
            <h2 className="store-title">Your Products</h2>
            <form className="storesearchbar-and-button" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search by product name"
                className="storeitem-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
            </form>
          </div>

          <div className="store-searchbody">
            <div className="store-filterbody">
                <form onSubmit={handleAddProduct} className="product-form">
                    <input type="text" placeholder="Product Name" value={product_name} onChange={(e) => setProductName(e.target.value)} />
                    <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <input type="text" placeholder="Model Number" value={model_number} onChange={(e) => setModelNumber(e.target.value)} />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" placeholder="Image URL" value={image_url} onChange={(e) => setImageUrl(e.target.value)} />
                    <input type="number" placeholder="Category ID" value={category_ID} onChange={(e) => setCategoryID(e.target.value)} />
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input type="number" placeholder="Store ID" value={store_ID} onChange={(e) => setStoreID(e.target.value)} />
                    <input type="text" placeholder="Product Link" value={product_link} onChange={(e) => setProductLink(e.target.value)} />
                    <input type="text" placeholder="Affiliate Link" value={affiliate_link} onChange={(e) => setAffiliateLink(e.target.value)} />

                    <button type="submit" className="add-product-button">+ Add Product</button>
                </form>
            </div>

            <ul className="store-itemlog">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <li key={item.product_ID} className="store_list">
                    <div className="store_list_top">
                      <h3>{item.product_name}</h3>
                      <p>
                        <strong>
                          {item.product_link ? (
                            <a href={item.product_link} target="_blank" rel="noopener noreferrer">
                              View Product
                            </a>
                          ) : "N/A"}
                        </strong>
                      </p>
                      <div className="sbutton-group">{/*
                        <button
                          className="edit-button"
                          onClick={() => window.location.href = `/edit-product/${item.product_ID}`}
                        >
                          Edit
                        </button>*/}
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(item.product_ID)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="store_list_bottom">
                      <div className="s-picandtime">
                        <p><strong>Last Updated:</strong> {item.last_updated ? new Date(item.last_updated).toLocaleDateString() : "N/A"}</p>
                        {item.image_url && (
                          <img src={item.image_url} alt={item.product_name} style={{ maxWidth: "150px" }} />
                        )}
                      </div>
                      <div className="s-itemdetails">
                        {item.store_URL ? (
                          <a href={item.store_URL} target="_blank" rel="noopener noreferrer" className="s-itemdetails-p">{item.store_name}</a>
                        ) : item.store_name}
                        <p className="s-itemdetails-p"><strong>Brand:</strong> {item.brand}</p>
                        <p className="s-itemdetails-p"><strong>Model Number:</strong> {item.model_number}</p>
                        <p className="s-itemdetails-p"><strong>Description:</strong> {item.description}</p>
                        <p className="s-itemdetails-p"><strong>Category:</strong> {item.category_name}</p>
                        <p className="s-itemdetails-p"><strong>Price:</strong> ${item.price}</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>No products found.</li>
              )}
            </ul>

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorePage;
