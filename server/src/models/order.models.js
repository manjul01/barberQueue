import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      ref: 'Customer', 
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected' , "hold"],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

 const Order = mongoose.model("Order" , orderSchema);
   
 export default Order