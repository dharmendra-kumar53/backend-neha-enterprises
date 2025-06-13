import express from 'express';
import {
  signup,
  login,
  getMyProfile,
  updateProfile,
} from '../controllers/userController.js';

import { authenticateUser } from '../middlewares/authUser.js'; // ✅ named import

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/profile', authenticateUser, getMyProfile);
router.put('/profile', authenticateUser, updateProfile);

export default router;
