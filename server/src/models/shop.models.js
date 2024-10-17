import mongoose, { Schema } from "mongoose";

const shopSchema = new Schema(
  {
    shopName: {
      type: String,
      unique: true,
      required: true,
    },
    ownerName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    shopOwner: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop" , shopSchema);

export default Shop;
