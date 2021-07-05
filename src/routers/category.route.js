const express = require('express');
const router = express.Router();
const Category = require('../db/models/Category.model')

router.post('/', (req,res)=>{
    const category = new Category(req.body);
    try {
        category.save();
        res.send('Category Created')
    } catch (error) {
        res.send(error)
    }
})

//Get All Categories
router.get('/', async (req,res)=>{
    try {
        const categories = await Category.find({});
        res.send(categories)
    } catch (error) {
        res.send(error)
    }
})

//Get Single Category
router.get('/:id',async (req,res) => {
    const {id} = req.params;
    try {
        const category = await Category.find({_id: id});
        await category.populate({
            path: 'products'
        }).execPopulate();
        res.send(category)
    } catch (error) {
        res.send(error)
        
    }
})

module.exports = router;