import express from 'express';
import db from '../db.js';

const router = express.Router();

/**
 * Add a new product along with initial price/store entry
 */
router.post('/add-product', (req, res) => {
  const {
    product_name,
    brand,
    model_number,
    description,
    image_url,
    category_ID,
    price,
    store_ID,
    product_link,
    affiliate_link
  } = req.body;

  const insertProductQuery = `
    INSERT INTO product (product_name, brand, model_number, description, image_url, category_ID)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const productValues = [product_name, brand, model_number, description, image_url, category_ID];

  db.query(insertProductQuery, productValues, (err, productResult) => {
    if (err) {
      console.error('Error inserting product:', err);
      return res.status(500).json({ error: 'Failed to add product' });
    }

    const product_ID = productResult.insertId;

    const insertPriceQuery = `
      INSERT INTO product_prices (product_ID, store_ID, price, product_link, affiliate_link)
      VALUES (?, ?, ?, ?, ?)
    `;
    const priceValues = [product_ID, store_ID, price, product_link, affiliate_link];

    db.query(insertPriceQuery, priceValues, (err, priceResult) => {
      if (err) {
        console.error('Error inserting price info:', err);
        return res.status(500).json({ error: 'Product created, but price info failed' });
      }

      return res.status(201).json({
        message: 'Product and price added successfully',
        productId: product_ID,
        priceId: priceResult.insertId
      });
    });
  });
});

/**
 * Update product info (product table only)
 */
router.put('/update-product/:id', (req, res) => {
  const product_ID = req.params.id;
  const {
    product_name,
    brand,
    model_number,
    description,
    image_url,
    category_ID
  } = req.body;

  const query = `
    UPDATE product 
    SET product_name = ?, brand = ?, model_number = ?, description = ?, image_url = ?, category_ID = ?
    WHERE product_ID = ?
  `;
  const values = [product_name, brand, model_number, description, image_url, category_ID, product_ID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Failed to update product' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product updated successfully' });
  });
});


router.delete('/delete-product/:product_ID', (req, res) => {
    const product_ID = parseInt(req.params.product_ID, 10);
  
    if (!product_ID || isNaN(product_ID)) {
      return res.status(400).json({ error: 'Invalid or missing Product ID' });
    }
  
    console.log('Attempting to delete product ID:', product_ID);
  
    db.query('DELETE FROM product_prices WHERE product_ID = ?', [product_ID], (err) => {
      if (err) {
        console.error('Error deleting product_prices:', err);
        return res.status(500).json({ error: 'Failed to delete product_prices' });
      }
  
      db.query('DELETE FROM search_history WHERE product_ID = ?', [product_ID], (err) => {
        if (err) {
          console.error('Error deleting from search_history:', err);
          return res.status(500).json({ error: 'Failed to delete search_history' });
        }
  
        db.query('DELETE FROM click_log WHERE product_ID = ?', [product_ID], (err) => {
          if (err) {
            console.error('Error deleting from click_log:', err);
            return res.status(500).json({ error: 'Failed to delete click_log' });
          }
  
          db.query('DELETE FROM product WHERE product_ID = ?', [product_ID], (err, result) => {
            if (err) {
              console.error('Error deleting product:', err);
              return res.status(500).json({ error: 'Failed to delete product' });
            }
  
            if (result.affectedRows === 0) {
              return res.status(404).json({ message: 'Product not found' });
            }
  
            return res.status(200).json({ message: 'Product deleted successfully' });
          });
        });
      });
    });
  });
  
  

/**
 * Get all products with latest price and store info
 */
router.post('/get-current', (req, res) => {
  const query = `
SELECT 
  p.product_ID, p.product_name, p.brand, p.model_number, p.description, p.image_url,
  c.category_name,
  pr.price, pr.product_link, pr.last_updated,
  s.store_name, s.store_URL
FROM product p
LEFT JOIN category c ON p.category_ID = c.category_ID
LEFT JOIN (
    SELECT * FROM product_prices pp
    WHERE (pp.product_ID, pp.last_updated) IN (
      SELECT product_ID, MAX(last_updated)
      FROM product_prices
      GROUP BY product_ID
    )
) pr ON p.product_ID = pr.product_ID
LEFT JOIN store s ON pr.store_ID = s.store_ID
ORDER BY pr.last_updated DESC
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }

    return res.status(200).json(result);
  });
});

export default router;
