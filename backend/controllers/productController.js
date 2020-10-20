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

// @desc  DELETE single Product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = AsynHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    return res.json({ message: 'Product Delete' });
  }

  res.status(404);
  throw new Error('Product not found');
});

// @desc  Create a Product
// @route POST /api/products
// @access Private/Admin
const createProduct = AsynHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc  Update a Product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = AsynHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
