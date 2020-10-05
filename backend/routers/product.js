import express from 'express';
import AsynHandler from 'express-async-handler';
import Product from '../models/product.js';
const router = express.Router();

// @desc  Fetch all Product
// @route GET /api/products
// @access Public
router.get(
  '/',
  AsynHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc  Fetch single Product
// @route GET /api/products/:id
// @access Public
router.get(
  '/:id',
  AsynHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) return res.json(product);

    res.status(404);
    throw new Error('Product not found');
  })
);

export default router;
