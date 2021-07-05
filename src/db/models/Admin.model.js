const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(email) {
            if(!validator.isEmail(email)) {
                throw new Error('Email must be a valid email');
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        // validate(password) {
        //     if(!validator.isStrongPassword(password)) {
        //         throw new Error('Password must be Strong')
        //     }
        // }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

adminSchema.methods.generateAuthToken = async function () {
    const admin = this;

    const token = jwt.sign({_id: admin._id.toString()}, 'twurshiringtask');
    admin.tokens = admin.tokens.concat({token});
    await admin.save();
    return token;
}

adminSchema.methods.toJSON = function () {
    const admin = this;
    const adminObject = admin.toObject();
    delete adminObject.password
    delete adminObject.tokens

    return adminObject;
}

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({email});
    if(!admin) {
        throw new Error('Email or password not matched');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if(!isMatch) {
        throw new Error('Email or password not matched');
    }

    return admin;
}

// Hash the plain password before save
adminSchema.pre('save', async function (next) {
    const admin = this;

    if(admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }

    next();
})



const Admin = new mongoose.model('Admin',adminSchema);
module.exports =  Admin