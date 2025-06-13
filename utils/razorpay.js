// /utils/razorpay.js
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // Use the key ID from the environment
  key_secret: process.env.RAZORPAY_KEY_SECRET,  // Use the key secret from the environment
});

export default razorpay;
