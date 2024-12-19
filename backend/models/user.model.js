const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            trim: true
        },
        lastname:{
            type: String,
            
            trim: true
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String
    },
}, { timestamps: true });
userSchema.methods.genereateAuthToken = function () {
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,)
    return token;
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;