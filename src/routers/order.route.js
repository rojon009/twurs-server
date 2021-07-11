const express = require('express');
const Order = require('../db/models/Order.model');
const Product = require('../db/models/Product.model');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/me', auth, (req,res) => {
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
router.post('/', auth, (req,res) => {
    Order.insertMany(req.body, function(error, docs) {
        if(error) return res.send({err: error})
        res.send(docs)
    });
})

module.exports = router