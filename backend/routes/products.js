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
            sortBy = 'price', // Default sortBy
            sortOrder = 'ASC',
            limit = 10 // Default limit
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
            params.push(parseFloat(minPrice)); // Ensure it's a number
        }

        if (maxPrice) {
            sql += ` AND pp.price <= ?`;
            params.push(parseFloat(maxPrice)); // Ditto
        }

        // Sorting
        const validSortOptions = {
            'price': 'pp.price',
            'last_updated': 'pp.last_updated',
            'product_name': 'p.product_name',
            'store_name': 's.store_name' // Added store name sorting
        };

        const sortColumnSQL = validSortOptions[sortBy] || validSortOptions['price']; // Default to price if invalid
        
        const validSortOrders = ['ASC', 'DESC'];
        const sortDirection = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

        sql += ` ORDER BY ${sortColumnSQL} ${sortDirection}`;
        sql += ` LIMIT ?`;
        // Fetch more to allow for multiple store prices per product, adjust multiplier as needed
        params.push(parseInt(limit, 10) * 5);

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }

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
                        prices: [] // To store prices from different stores
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

            // If sorting was by a field within the 'prices' array (e.g., store_name for one specific price entry, or price itself)
            if (sortBy === 'store_name' || sortBy === 'price' || sortBy === 'last_updated') {
                 finalProducts.forEach(product => {
                    // Sort individual product prices if necessary
                    product.prices.sort((a, b) => {
                        if (sortBy === 'store_name') {
                            return a.store_name.localeCompare(b.store_name) * (sortDirection === 'ASC' ? 1 : -1);
                        }
                        if (sortBy === 'price') {
                            return (a.price - b.price) * (sortDirection === 'ASC' ? 1 : -1);
                        }
                        if (sortBy === 'last_updated') {
                            return (new Date(b.last_updated) - new Date(a.last_updated)) * (sortDirection === 'ASC' ? 1 : -1); // Inverse for date: more recent first for DESC
                        }
                        return 0;
                    });
                });

                // Re-sort the `finalProducts` array based on the primary price entry or relevant field
                finalProducts.sort((a, b) => {
                    const valA = (a.prices.length > 0) ? (sortBy === 'store_name' ? a.prices[0].store_name : sortBy === 'price' ? a.prices[0].price : new Date(a.prices[0].last_updated)) : null;
                    const valB = (b.prices.length > 0) ? (sortBy === 'store_name' ? b.prices[0].store_name : sortBy === 'price' ? b.prices[0].price : new Date(b.prices[0].last_updated)) : null;

                    if (valA === null || valB === null) return 0; // Handle products with no prices if any

                    let comparison = 0;
                    if (typeof valA === 'string') {
                        comparison = valA.localeCompare(valB);
                    } else if (valA instanceof Date) {
                        comparison = valA - valB;
                         if (sortBy === 'last_updated' && sortDirection === 'DESC') comparison *= -1; // ensure correct date sorting for DESC (most recent first)
                         else if (sortBy === 'last_updated' && sortDirection === 'ASC') comparison *= 1;
                    }
                    else { // numbers (price)
                        comparison = valA - valB;
                    }
                    return comparison * (sortDirection === 'ASC' ? 1 : -1);
                });
            }


            // Apply the overall limit *after* grouping and potential re-sorting
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