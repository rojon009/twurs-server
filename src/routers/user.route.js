const express = require('express');
const router = express.Router();
const User = require('../db/models/User.model');
const auth = require('../middleware/auth')

//Login a user
router.post('/login', async (req,res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({user,token})
    } catch (error) {
        res.send(error)
    }
})


//Create a user
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch (error) {
        res.send(error);
    }
})

//Get user Profile
router.get('/me', auth, (req, res)=>{
    try {
        res.send(req.user)       
    } catch (error) {
        res.send(error)
    }
})



module.exports = router;