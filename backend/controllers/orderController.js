import express from 'express';
import AsynHandler from 'express-async-handler';
import Order from '../models/order.js';

// @desc  Create new Order
// @route POST /api/order
// @access Private
const addOrderItems = AsynHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save()
    res.status(201).json(createOrder)
  }
});



// @desc  Get order by Id
// @route GET /api/order
// @access Private
const getOrderById = AsynHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if(order) {
   res.json(order)
  } else {
    res.status(404);
    throw new Error('Order not found');
  }

});

export { addOrderItems, getOrderById };