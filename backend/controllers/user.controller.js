const UserModel = require("./../models/user.model");
const blackListTokenModel = require("./../models/blacklistToken.model");
const userService = require("./../services/user.service")
const {validationResult} = require('express-validator')
module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
     
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, password} = req.body;
    const hashPassword = await UserModel.hashPassword(password);

    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password: hashPassword
    });
    const token = user.genereateAuthToken();
    res.status(201).json({token, user});
}

module.exports.loginUser = async (req,res,next) => {
    const errors = validationResult(req);
     
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;
    const user = await UserModel.findOne({email}).select('+password');
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    const isValid = await user.comparePassword(password);
    if(!isValid){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const token = user.genereateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token, user});
}

module.exports.getProfile = async (req,res,next) => {
    res.status(200).json({user: req.user});
}

module.exports.logoutUser = async (req,res,next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
   await blackListTokenModel.create({token});
    res.status(200).json({message:"logged out"});
}