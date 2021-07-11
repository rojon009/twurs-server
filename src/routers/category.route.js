const express = require('express');
const router = express.Router();
const Category = require('../db/models/Category.model')

//Create Category
router.post('/', (req, res) => {
    const category = new Category(req.body);
    try {
        category.save();
        res.send('Category Created')
    } catch (error) {
        res.send(error)
    }
})

//Get All Categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.send(categories)
    } catch (error) {
        res.send(error)
    }
})

//Get Single Category
router.get('/:categoryName', (req, res) => {
    const { categoryName } = req.params;

    Category.findOne({ name: categoryName }).populate('products').exec(function (error, doc) {
        if (error) return res.send(error)
        res.send(doc)
    });
})

module.exports = router;