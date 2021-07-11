const express = require('express');
const Order = require('../db/models/Order.model');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

router.get('/me', auth, (req, res) => {
    Order.findOne(req.body).populate({
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
router.post('/', auth, (req, res) => {
    Order.insertMany(req.body, function (error, docs) {
        if (error) return res.send({ err: error })
        res.send(docs)
    });
})

router.get('/', isAdmin, (req, res) => {
    Order.find({}).populate('products.product').exec((err, docs) => {
        if (err) return res.send(err)
        res.send(docs)
    })
})

module.exports = router