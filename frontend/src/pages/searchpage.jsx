import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './search.css';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'price',
        sortOrder: 'ASC'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/search/categories');
                setCategories(response.data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const params = {
                query: searchQuery,
                ...filters
            };

            Object.keys(params).forEach(key => {
                if (params[key] === '') delete params[key];
            });

            const response = await axios.get('http://localhost:8800/api/search/search', { params });
            setProducts(response.data);
        } catch (err) {
            console.error("Search failed:", err);
            setError("Failed to search products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="search-container">
            <div className="search-header">
                <h1>Find the Best Prices</h1>
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-group">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button" disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    <div className="filter-section">
                        <div className="filter-group">
                            <label>Category:</label>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                className="filter-select"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category.category_ID} value={category.category_ID}>
                                        {category.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="price-range-label">Price Range:</label>
                            <div className="price-range">
                                <div className="price-range-inputs">
                                    <input
                                        type="number"
                                        name="minPrice"
                                        placeholder="Minimum"
                                        value={filters.minPrice}
                                        onChange={handleFilterChange}
                                        className="price-input"
                                    />
                                    <span>to</span>
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        placeholder="Maximum"
                                        value={filters.maxPrice}
                                        onChange={handleFilterChange}
                                        className="price-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="filter-group">
                            <label>Sort Options:</label>
                            <div className="sort-container">
                                <div className="sort-group">
                                    <select
                                        name="sortBy"
                                        value={filters.sortBy}
                                        onChange={handleFilterChange}
                                        className="filter-select"
                                    >
                                        <option value="price">Price</option>
                                        <option value="product_name">Name</option>
                                        <option value="last_updated">Recently Updated</option>
                                        <option value="store_name">Store</option>
                                    </select>
                                </div>
                                <div className="sort-group">
                                    <select
                                        name="sortOrder"
                                        value={filters.sortOrder}
                                        onChange={handleFilterChange}
                                        className="filter-select"
                                    >
                                        <option value="ASC">Ascending</option>
                                        <option value="DESC">Descending</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="results-container">
                {products.length > 0 ? (
                    <div className="product-grid">
                        {products.map(product => {
                            console.log("Product from search results:", product);
                            return (
                                <Link
                                    key={product.product_ID}
                                    to={`/product/${product.product_ID}`}
                                    state={{ product }}
                                    className="product-card"
                                >
                                    <div className="product-image-container">
                                        <img
                                            src={product.image_url || 'https://via.placeholder.com/150'}
                                            alt={product.product_name}
                                            className="product-image"
                                        />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{product.product_name}</h3>
                                        <p className="product-brand">{product.brand}</p>
                                        <p className="product-category">{product.category_name}</p>

                                        <div className="product-prices">
                                            {product.prices.map(price => (
                                                <div key={price.price_ID} className="store-price">
                                                    <div className="store-info">
                                                        <img
                                                            src={price.store_logo || 'https://via.placeholder.com/30'}
                                                            alt={price.store_name}
                                                            className="store-logo"
                                                        />
                                                        <span>{price.store_name}</span>
                                                    </div>
                                                    <div className="price-amount">${price.price}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    !loading && <div className="no-results">No products found. Try a different search.</div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
