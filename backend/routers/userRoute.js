import express from 'express';
const router = express.Router();
import { authUser, getAllUsers, getUserProfile, registerUser, updateUserProfile  } from '../controllers/userController.js'
import { protect, isUserAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, isUserAdmin, getAllUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router;
