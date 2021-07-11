const express = require('express');
const router = express.Router();

const Product = require('../db/models/Product.model');
const isAdmin = require('../middleware/isAdmin');


//Add new Product
router.post('/new', isAdmin, async (req,res)=> {
   
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(200).send("Product is created")
    } catch (error) {
        res.send(error);
    }
})

//Update Product Quantity
router.patch('/update/:id',async (req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.updateOne({_id: id}, req.body)
        res.send(product)
    } catch (error) {
        res.send(error)
    }

})

//Get all Products
router.get('/', (req,res)=>{
    Product.find({}).populate('category', 'name').exec((err, docs) => {
        if(err) return res.send(err);
        res.send(docs)
    })
})

//Get Products By Category
router.get('/category/:category',async (req,res)=>{
    const {category} = req.params;
    try {
        const products = await Product.find({category});
        if(!products) {
            res.send("No product is uploaded.")
        }
        res.send(products)
    } catch (error) {
        res.send(error)
    }
})

//Get Product By ID
router.get('/:id', async (req,res)=>{
    const {id} = req.params;

    try {
        const product = await Product.findById(id);
        if(!product) return res.status(404).send("This Product is Not found")
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

//Delete Product By ID
router.delete('/:id', isAdmin, async (req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).send("This Product is not found");
        res.send(product);
    } catch (error) {
        res.send(error)
    }
})




module.exports = router;