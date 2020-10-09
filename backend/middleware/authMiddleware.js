import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import AsynHandler from 'express-async-handler'

const protect = AsynHandler(async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decode.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }


})


export { protect }
