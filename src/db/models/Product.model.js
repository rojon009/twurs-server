const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0) {
                throw new Error('Product must have quantity');
            }
        }
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0) {
                throw new Error('Product must have Price');
            }
        }
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product