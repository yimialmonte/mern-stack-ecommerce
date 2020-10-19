import express from 'express';
const router = express.Router();
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect, isUserAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isUserAdmin, getAllUsers);
router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, isUserAdmin, deleteUser)
  .get(protect, isUserAdmin, getUserById)
  .put(protect, isUserAdmin, updateUser);

export default router;
