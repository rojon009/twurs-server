const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
