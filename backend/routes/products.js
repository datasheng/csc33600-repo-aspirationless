import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/products - Search by product name or category
router.get('/search', (req, res) => {
  const searchQuery = req.query.q || "";
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
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

export default router;