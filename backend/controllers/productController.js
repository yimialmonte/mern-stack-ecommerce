import express from 'express';
import AsynHandler from 'express-async-handler';
import Product from '../models/product.js';

// @desc  Fetch all Product
// @route GET /api/products
// @access Public
const getProducts = AsynHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({ ...keyword });
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

// @desc  Create new Review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = AsynHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReview = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReview) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
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
  createProductReview,
};
