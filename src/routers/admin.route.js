const express = require('express');
const router = express.Router();
const Admin = require('../db/models/Admin.model');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

//Create a Admin
router.post('/new', async (req, res) => {
    const admin = new Admin(req.body);
    try {
        await admin.save();
        const token = await admin.generateAuthToken();
        res.status(201).send({admin,token});
    } catch (error) {
        res.send(error);
    }
})

//Get Admin Profile
router.get('/me', isAdmin, (req, res)=>{
    try {
        res.send(req.admin)       
    } catch (error) {
        res.send(error)
    }
})

//User Login
router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password );
        if(!admin) {
            res.send("NOT FOUND");
        }

        const token = await admin.generateAuthToken();

        res.status(200).send({admin,token});
    } catch (error) {
        res.send(error);
    }
})



//Admin Logout
router.post('/logout', isAdmin, async (req,res)=>{
    try {
        req.admin.tokens = req.admin.tokens.filter(token => token.token !== req.token)
        const admin = await req.admin.save();
        res.send(admin);
    } catch (error) {
        res.status(500).send(error)
    }
})

//Admin Logout from All sessions
router.post('/logoutAll', isAdmin, async (req,res)=>{
    try {
        req.admin.tokens = [];
        const admin = await req.admin.save();
        res.send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
})




module.exports = router;