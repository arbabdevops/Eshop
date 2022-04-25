const express = require('express');
const router = express.Router();

// *Controllers
const {getProducts, newProduct, getSingleProduct, deleteProduct, updateProduct} = require('../controllers/productController');

// *routes
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(newProduct);
router.route('/admin/product/:id').delete(deleteProduct).put(updateProduct);

module.exports = router;
