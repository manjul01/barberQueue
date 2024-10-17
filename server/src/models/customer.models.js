import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    
    name: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true, 
    },
    shopOwner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer" , customerSchema);

export default Customer;
