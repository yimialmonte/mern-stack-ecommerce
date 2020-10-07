import express from 'express';
import AsynHandler from 'express-async-handler';
import Product from '../models/product.js';

// @desc  Fetch all Product
// @route GET /api/products
// @access Public
const getProducts = AsynHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


// @desc  Fetch single Product
// @route GET /api/products/:id
// @access Public
const getProductById = AsynHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) return res.json(product);

  res.status(404);
  throw new Error('Product not found');
});

export { getProducts, getProductById };
