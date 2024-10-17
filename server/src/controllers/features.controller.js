import Customer from "../models/customer.models.js";
import Order from "../models/order.models.js";


const placeOrder = async (req, res) => {
    const userId = req.user.id; 
  
    try {
     
      const customer = await Customer.findById(userId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
     
      const newOrder = new Order({
        username: customer.name,
        userId: customer._id,
        status: 'pending',
        createdAt: new Date(),
      });
  
      // Save the order to the database
      await newOrder.save();
  
      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  const getPendingOrders = async (req, res) => {
    try {
      const pendingOrders = await Order.find({ status: 'pending' });
  
      if (pendingOrders.length === 0) {
        return res.status(404).json({ message: 'No pending orders found' });
      }
  
      res.status(200).json({ orders: pendingOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const getHoldOrders = async (req, res) => {
    try {
      const pendingOrders = await Order.find({ status: 'hold' });
  
      if (pendingOrders.length === 0) {
        return res.status(404).json({ message: 'No pending orders found' });
      }
  
      res.status(200).json({ orders: pendingOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getAcceptedOrders = async (req, res) => {
    try {
      const acceptedOrders = await Order.find({ status: 'accepted' });
  
      if (acceptedOrders.length === 0) {
        return res.status(200).json({ message: 'No pending orders found' });
      }
  
      res.status(200).json({ orders: acceptedOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const updateOrderStatus = async (req, res) => {
    
    const { status , orderId } = req.body;
  

    const validStatuses = ['accepted', 'rejected' , 'hold'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
  
    try {
     
      const order = await Order.findById(orderId); 
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json({ message: `Order ${status} successfully`, order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getOrderStatus = async(req , res) => {

    const orderId = req.query.orderId;

    const currOrder = await Order.findById(orderId);
    if(!currOrder) {
        res
            .status(401)
            .json({
                message :"order not found"
            })
    }

    res.status(200)
        .json({
            message : "current order fetched",
            order : currOrder
        })


  }

  const deleteOrder = async (req, res) => {
    const { orderId } = req.body;
  
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }
  
    try {
      const order = await Order.findByIdAndDelete(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
   
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  export {
    updateOrderStatus,
    getAcceptedOrders,
    getPendingOrders,
    placeOrder,
    getHoldOrders,
    getOrderStatus,
    deleteOrder
  }