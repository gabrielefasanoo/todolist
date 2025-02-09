import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateMe,
  deleteMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Proteggi tutte le route dopo questo middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

export default router; 