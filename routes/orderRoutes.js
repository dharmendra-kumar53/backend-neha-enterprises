import express from 'express';
import { placeOrder, getUserOrders,cancelOrder} from '../controllers/orderController.js';
import { authenticateUser } from '../middlewares/authUser.js';  // assuming you renamed export

const router = express.Router();

// Use authenticateUser middleware to protect routes
router.post('/orders', authenticateUser, placeOrder);
router.get('/my-orders', authenticateUser, getUserOrders);
router.put("/cancel/:orderId", authenticateUser, cancelOrder);

// Example profile route
router.get('/profile', authenticateUser, (req, res) => {
  res.json({ message: 'User profile route', userId: req.userId });
});

export default router;
