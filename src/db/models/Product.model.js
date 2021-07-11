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
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product