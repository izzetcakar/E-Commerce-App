import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderProducts: [
      {
        seller: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
        },
        image: {
          type: String,
          required: true
        },
        kdv: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 100
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        }
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    },
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;