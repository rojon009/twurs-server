const express = require('express');
const router = express.Router();
const User = require('../db/models/User.model');

router.post('/', async (req,res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        res.status(200).send("User is created.")
    } catch (error) {
        res.send(error)
    }
})

router.get('/:id',async (req,res) =>{
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if(!user) {
            res.send("User not found");
        }
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;