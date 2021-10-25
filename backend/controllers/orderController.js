import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

export const addOrderItems = asyncHandler(async (req, res) => {
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
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if(orders){
    res.status(200).json(orders);
  }else{
    res.status(404);
    throw new Error('No orders');
  }
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if(order){
    res.status(201).json(order);
  }else{
    res.status(404);
    throw new Error('Order not found');
  }
});
