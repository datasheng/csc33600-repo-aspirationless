import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/search_history/searched
router.get('/searched', (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'Missing user ID in headers.' });
  }

  const sqlcode = `    
    SELECT 
      search_history.search_ID,
      search_history.user_ID,
      user.user_name,
      search_history.search_date,
      search_history.price_when_search,
      product.product_name,
      latest_prices.price,
      store.store_name
    FROM search_history
    JOIN product ON product.product_ID = search_history.product_ID
    JOIN store ON store.store_ID = search_history.store_ID
    JOIN user ON user.user_ID = search_history.user_ID
    JOIN (
      SELECT product_ID, store_ID, price
      FROM product_prices pp1
      WHERE last_updated = (
        SELECT MAX(last_updated)
        FROM product_prices pp2
        WHERE pp1.product_ID = pp2.product_ID
          AND pp1.store_ID = pp2.store_ID
      )
    ) AS latest_prices
      ON latest_prices.product_ID = search_history.product_ID
      AND latest_prices.store_ID = search_history.store_ID
    WHERE search_history.user_ID = ?
    ORDER BY search_history.search_date DESC;
  `;

  db.query(sqlcode, [userId], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

export default router;
//
