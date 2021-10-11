import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const getProducts = asyncHandler(async (req, res) => {
  res.json(await Product.find({}));
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});
