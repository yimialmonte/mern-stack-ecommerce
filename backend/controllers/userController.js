import express from 'express';
import AsynHandler from 'express-async-handler';
import User from '../models/user.js';
import { generateToken } from '../utils/generateToken.js';

// @desc  Auth user & get token
// @route POST /api/user/login
// @access Public
const authUser = AsynHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc  Get user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = AsynHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc  Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = AsynHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, email, password } = req.body;

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    user.password = password;
  }

  const updateUser = await user.save();
  res.json({
    _id: updateUser._id,
    name: updateUser.name,
    email: updateUser.email,
    isAdmin: updateUser.isAdmin,
  });
});

// @desc  Register new user
// @route POST /api/users
// @access Public
const registerUser = AsynHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
