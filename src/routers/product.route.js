const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongoose').Types;

const Product = require('../db/models/Product.model')

router.get('/',async (req,res)=>{
    try {
        const products = await Product.find();
        if(!products) {
            res.send("No product is uploaded.")
        }
        // await products.populate('category').execPopulate();
        res.send(products)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req,res)=> {
    const product = new Product(req.body);
    product.category = new ObjectId(product.category);
    try {
        await product.save();
        res.status(200).send("Product is created")
    } catch (error) {
        res.send(error);
    }
})




module.exports = router;