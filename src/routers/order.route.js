const express = require('express');
const Order = require('../db/models/Order.model');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

router.get('/me', auth, (req, res) => {
    Order.findOne({userEmail: req.user.email}).populate({
        path: 'products.product',
        populate: {
            path: 'category'
        }
    }).select().exec(function (err, docs) {
        if (err) return console.log(err);
        res.send(docs)
    });
})

//Insert order
router.post('/', auth, async (req, res) => {
    try {
        const order = await Order.findOne({userEmail: req.body.userEmail});
        if(order) {
            Order.updateOne({userEmail: req.body.userEmail},{products: [...order.products,...req.body.products]}, (err, docs)=> {
                if(err) return res.send(err)
                res.send(docs)
            })
        } else {
            const order = new Order(req.body)
            await order.save();
            res.send(order)
        }
    } catch (error) {
        res.send(error)
    }
})

router.get('/', isAdmin, (req, res) => {
    Order.find({}).populate('products.product').exec((err, docs) => {
        if (err) return res.send(err)
        res.send(docs)
    })
})

module.exports = router