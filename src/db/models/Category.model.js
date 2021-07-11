const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

// Setting virtual property for search products based on category
categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
