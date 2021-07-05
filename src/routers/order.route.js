const express = require('express');
const Order = require('../db/models/Order.model');
const Product = require('../db/models/Product.model');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/me', auth, async (req,res) => {
    try {
        const order = await Order.findOne({email: req.user.email});
        if(!order) return res.status(404).send('You haven\'t order any product yet');
        res.send(order);
    } catch (error) {
        res.send(order)
    }
})

router.post('/', auth, (req,res) => {
    Order.insertMany(req.body, (err,docs) => {
        if (err) return res.send(err);
        const products = [];
        docs.forEach(async ({productId,quantity}) => {
            const product = await Product.findById(productId);
            products.push(product)
        });
        res.send(products)
    })
})

module.exports = router