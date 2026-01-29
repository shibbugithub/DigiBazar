const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview
} = require('../controllers/productController');  // Import product controller functions
const { protect, admin } = require('../middleware/auth');  // Import auth middleware if needed

// Product routes
router.route('/')
  .get(getProducts)  // GET /api/products - Fetch all products (public)
  .post(protect, admin, createProduct);  // POST /api/products - Create product (admin only)

router.route('/:id')
  .get(getProduct)  // GET /api/products/:id - Fetch single product (public)
  .put(protect, admin, updateProduct)  // PUT /api/products/:id - Update product (admin only)
  .delete(protect, admin, deleteProduct);  // DELETE /api/products/:id - Delete product (admin only)

router.post('/:id/reviews', protect, addReview);  // POST /api/products/:id/reviews - Add review (logged-in users)

module.exports = router;