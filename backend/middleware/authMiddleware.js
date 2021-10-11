import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  next();
});

export { protect };
