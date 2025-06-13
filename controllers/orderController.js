import Order from '../models/Order.js';

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, paymentMode } = req.body;

    const newOrder = new Order({
      userId: req.userId,
      items,
      totalAmount,
      deliveryAddress,
      paymentMode,
      orderDate: new Date(),
      status: 'Placed',
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Order Save Error:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Get Orders Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id; // ✅ Correct way to access authenticated user ID

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'Order already cancelled' });
    }

    if (order.status === 'Delivered') {
      return res.status(400).json({ success: false, message: 'Delivered orders cannot be cancelled' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.json({ success: true, message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Cancel Order Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
