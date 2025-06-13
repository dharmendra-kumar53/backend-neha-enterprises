import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  deliveryAddress: {
    fullName: String,
    mobile: String,
    house: String,
    area: String,
    district: String,
    state: String,
    pinCode: String,
  },
  paymentMode: { type: String, enum: ['Online', 'COD'], default: 'COD' },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Placed', 'Cancelled'], default: 'Placed' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
