const mongoose = require("mongoose");
const Product = require("./Product.model");

const orderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        require: true,
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

orderSchema.pre("save", async function (next) {
    const order = this;
    console.log(order)
    next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
