import express from 'express';
import db from '../db.js';

const router = express.Router();


// 



// BASIC SEARCH REQUEST 
router.get('/searched', (req, res) => {
    const username = req.headers['x-username'];
    const sqlcode = `    
    SELECT 
      search_history.search_ID,
      search_history.user_ID,
      users.user_name,
      search_history.search_date,
      search_history.price_when_search,
      product.product_name,
      product_prices.price,
      store.store_name
    FROM search_history
    JOIN product ON product.product_ID = search_history.product_ID
    JOIN store ON store.store_ID = search_history.store_ID
    JOIN users ON users.user_ID = search_history.user_ID
    JOIN product_prices ON product_prices.product_ID = search_history.product_ID
    WHERE users.user_name = ?
    ORDER BY search_history.search_date DESC;
  `;


    db.query(sqlcode, [username], (err, results) => {
        if (err) {
        console.error('DB error:', err);
        res.status(500).json({ error: 'Database error' });
        } else {
        res.json(results);
        }
    });
});

export default router;