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
router.get('/:id', (req, res) => {
  const productId = req.params.id;

  const sql = `
    SELECT 
      s.store_name, 
      o.price, 
      o.product_url,
      p.product_name,
      p.image_url
    FROM product_offer o
    JOIN store s ON o.store_ID = s.store_ID
    JOIN product p ON o.product_ID = p.product_ID
    WHERE o.product_ID = ?
  `;

  db.query(sql, [productId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error during product lookup' });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { product_name, image_url } = results[0];
    const offers = results.map(r => ({
      store_name: r.store_name,
      price: r.price,
      product_url: r.product_url
    }));

    res.json({
      name: product_name,
      image: image_url,
      offers
    });
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
