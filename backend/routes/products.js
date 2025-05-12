import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const {
            query,
            category,
            minPrice,
            maxPrice,
            sortBy = 'price',
            sortOrder = 'ASC',
            limit = 10
        } = req.query;

        let sql = `
            SELECT
                p.product_ID,
                p.product_name,
                p.brand,
                p.image_url,
                p.description,
                pp.price_ID,
                pp.price,
                pp.last_updated,
                pp.product_link,
                s.store_ID,
                s.store_name,
                s.store_logo,
                c.category_ID,
                c.category_name
            FROM product p
            JOIN product_prices pp ON p.product_ID = pp.product_ID
            JOIN store s ON pp.store_ID = s.store_ID
            JOIN category c ON p.category_ID = c.category_ID
            WHERE 1=1
        `;

        const params = [];

        if (query) {
            sql += ` AND (p.product_name LIKE ? OR p.brand LIKE ? OR p.description LIKE ?)`;
            params.push(`%${query}%`, `%${query}%`, `%${query}%`);
        }

        if (category) {
            sql += ` AND c.category_ID = ?`;
            params.push(category);
        }

        if (minPrice) {
            sql += ` AND pp.price >= ?`;
            params.push(parseFloat(minPrice));
        }

        if (maxPrice) {
            sql += ` AND pp.price <= ?`;
            params.push(parseFloat(maxPrice));
        }

        // First, get all matching products with their prices
        db.query(sql, params, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Group products and their prices
            const productsMap = new Map();
            results.forEach(row => {
                if (!productsMap.has(row.product_ID)) {
                    productsMap.set(row.product_ID, {
                        product_ID: row.product_ID,
                        product_name: row.product_name,
                        brand: row.brand,
                        description: row.description,
                        image_url: row.image_url,
                        category_ID: row.category_ID,
                        category_name: row.category_name,
                        prices: []
                    });
                }
                productsMap.get(row.product_ID).prices.push({
                    price_ID: row.price_ID,
                    price: row.price,
                    last_updated: row.last_updated,
                    store_ID: row.store_ID,
                    store_name: row.store_name,
                    store_logo: row.store_logo,
                    product_link: row.product_link
                });
            });

            let finalProducts = Array.from(productsMap.values());

            // For price sorting, we need to consider the lowest price for each product
            if (sortBy === 'price') {
                finalProducts.forEach(product => {
                    // Sort prices for each product from low to high
                    product.prices.sort((a, b) => a.price - b.price);
                });

                // Sort products based on their lowest price
                finalProducts.sort((a, b) => {
                    const lowestPriceA = a.prices[0]?.price || 0;
                    const lowestPriceB = b.prices[0]?.price || 0;
                    return sortOrder === 'ASC' 
                        ? lowestPriceA - lowestPriceB 
                        : lowestPriceB - lowestPriceA;
                });
            } else if (sortBy === 'product_name') {
                finalProducts.sort((a, b) => {
                    return sortOrder === 'ASC'
                        ? a.product_name.localeCompare(b.product_name)
                        : b.product_name.localeCompare(a.product_name);
                });
            } else if (sortBy === 'last_updated') {
                finalProducts.forEach(product => {
                    // Sort prices by last_updated (newest first)
                    product.prices.sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated));
                });

                finalProducts.sort((a, b) => {
                    const newestA = a.prices[0]?.last_updated ? new Date(a.prices[0].last_updated) : 0;
                    const newestB = b.prices[0]?.last_updated ? new Date(b.prices[0].last_updated) : 0;
                    return sortOrder === 'ASC'
                        ? newestA - newestB
                        : newestB - newestA;
                });
            } else if (sortBy === 'store_name') {
                finalProducts.forEach(product => {
                    // Sort prices by store name
                    product.prices.sort((a, b) => a.store_name.localeCompare(b.store_name));
                });

                finalProducts.sort((a, b) => {
                    const storeA = a.prices[0]?.store_name || '';
                    const storeB = b.prices[0]?.store_name || '';
                    return sortOrder === 'ASC'
                        ? storeA.localeCompare(storeB)
                        : storeB.localeCompare(storeA);
                });
            }

            // Apply limit after all sorting
            const effectiveLimit = parseInt(limit, 10);
            if (finalProducts.length > effectiveLimit) {
                finalProducts = finalProducts.slice(0, effectiveLimit);
            }

            res.json(finalProducts);
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Failed to search products" });
    }
});

// GET ALL CATEGORIES (for filter dropdown)
router.get('/categories', (req, res) => {
    const sql = "SELECT * FROM category ORDER BY category_name";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error fetching categories:", err);
            return res.status(500).json({ error: "Database error fetching categories" });
        }
        res.json(results);
    });
});

export default router;