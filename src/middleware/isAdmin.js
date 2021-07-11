const jwt = require('jsonwebtoken');
const Admin = require('../db/models/Admin.model');

const isAdmin = async (req, res, next) => {
    try {
        const token = await req.header('Authorization').replace('Bearer ', '');
        const decodedToken = await jwt.verify(token, 'twurshiringtask');
        const admin = await Admin.findOne({ _id: decodedToken._id, 'tokens.token': token });
        if (!admin) {
            throw new Error();
        }
        req.admin = admin;
        req.token = token;
        next();

    } catch (error) {
        res.status(401).send({ err: 'You Are not Admin' })
    }
}

module.exports = isAdmin;