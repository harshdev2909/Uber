const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const captianSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vechile: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        vechileType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});

captianSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captianSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captianSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const CaptianModel = mongoose.model('Captian', captianSchema);
module.exports = CaptianModel;