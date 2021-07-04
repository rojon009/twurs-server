const express = require('express');
const router = express.Router();
const User = require('../db/models/User.model');
const auth = require('../middleware/auth')



//User Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password );
        if(!user) {
            res.send("NOT FOUND");
        }

        const token = await user.generateAuthToken();

        res.status(200).send({user,token});
    } catch (error) {
        res.send(error);
    }
})

//Create a user
router.post('/new', async (req, res) => {
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


//User Logout
router.post('/logout',auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        const user = await req.user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }
})

//User Logout from All sessions
router.post('/logoutAll',auth, async (req,res)=>{
    try {
        req.user.tokens = [];
        const user = await req.user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})



//Get All users for testing
router.get("/all", async ( req, res ) => {
    try {
        const users = await User.find({});
        if(!users) return res.send('NO USER IS CREATED');
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})



module.exports = router;