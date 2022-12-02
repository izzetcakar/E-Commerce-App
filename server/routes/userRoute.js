import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
  updateUser,
  updateUserByAdmin,
  deleteUser,
  getAllUsers,
  getUserById
} from '../controllers/user.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(verifyToken, isAdmin, getAllUsers)

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)

router.route('/profile')
  .get(verifyToken, getUser)
  .put(verifyToken, updateUser)

router.route('/')
  .get(verifyToken, isAdmin, getAllUsers)

router.route('/:id')
  .get(verifyToken, isAdmin, getUserById)
  .put(verifyToken, isAdmin, updateUserByAdmin)
  .delete(verifyToken, isAdmin, deleteUser)

export default router;