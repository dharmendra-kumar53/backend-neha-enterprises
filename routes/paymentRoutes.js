import express from 'express';
import razorpay from '../utils/razorpay.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Route to create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100,  // Convert to paise
      currency: 'INR',
      receipt: `receipt_${uuidv4()}`,
      payment_capture: 1,  // Auto-capture
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount / 100,  // Convert back to INR
      currency: order.currency,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Order creation failed' });
  }
});

export default router;
