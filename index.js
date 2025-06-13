import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import userRoutes from './routes/userRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js'; 
import paymentRoutes from './routes/paymentRoutes.js'; 

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api', orderRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
