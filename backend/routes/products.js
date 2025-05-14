import express from 'express';
import db from '../db.js';

const router = express.Router();

// ----------------------------------------------
// GET /api/products/search?q=keyword
// Search for products by name or category
// ----------------------------------------------
router.get('/search', (req, res) => {
  const searchQuery = req.query.q || '';
  const sql = `
    SELECT 
      p.product_ID, 
      p.product_name, 
      p.brand, 
      p.model_number, 
      p.description, 
      p.image_url, 
      c.category_name
    FROM product p
    LEFT JOIN category c ON p.category_ID = c.category_ID
    WHERE p.product_name LIKE ? OR c.category_name LIKE ?
  `;

  db.query(sql, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error during search' });
    res.json(results);
  });
});


// ----------------------------------------------
// GET /api/products/:id
// Get offers and basic product info for a single product
// ----------------------------------------------

// Hot Products Route
router.get("/hot-products", (req, res) => {
    const query = `
        SELECT 
            p.product_ID, 
            p.product_name, 
            p.image_url, 
            MIN(pp.price) AS price
        FROM product p
        JOIN product_prices pp ON p.product_ID = pp.product_ID
        GROUP BY p.product_ID
        ORDER BY RAND()
        LIMIT 5;
    `;

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Failed to fetch hot products:", error.message, error.stack);
            return res.status(500).json({ error: "Failed to fetch hot products" });
        }

        console.log("Hot Products:", rows);
        res.json(rows);
    });
});

// Top Deals Route
router.get("/top-deals", (req, res) => {
    const query = `
        SELECT 
            p.product_ID, 
            p.product_name, 
            p.image_url, 
            MIN(pp.price) AS price
        FROM product p
        JOIN product_prices pp ON p.product_ID = pp.product_ID
        GROUP BY p.product_ID
        ORDER BY price ASC
        LIMIT 5;
    `;

    db.query(query, (error, rows) => {
        if (error) {
            console.error("Failed to fetch top deals:", error.message, error.stack);
            return res.status(500).json({ error: "Failed to fetch top deals" });
        }

        console.log("Top Deals:", rows);
        res.json(rows);
    });
});


// ----------------------------------------------
// GET /api/products/random
// Fetch ads for free users only
// ----------------------------------------------
router.get('/random', (req, res) => {
  const sql = `
    SELECT * FROM ads 
    WHERE active = 1
    ORDER BY RAND()
    LIMIT 4
  `;

  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.status(200).json(data);
  });
});


export default router;
