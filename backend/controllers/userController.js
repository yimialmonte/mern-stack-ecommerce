import express from 'express';
import AsynHandler from 'express-async-handler';
import User from '../models/user.js';
import { generateToken } from '../utils/generateToken.js'
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
      token: generateToken(user._id)
    });
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
});

export { authUser };
