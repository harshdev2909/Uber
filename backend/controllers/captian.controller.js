const bcrypt = require('bcrypt');
const captianService = require('../services/captian.service');
const { validationResult } = require('express-validator');
const captianModel = require('../models/captian.model');

module.exports.registerCaptian = async (req, res,next) => {
    const errors = validationResult(req);
     
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, password ,vechile} = req.body;
    const hashPassword = await captianModel.hashPassword(password);

    const captian = await captianService.createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password: hashPassword,
        color : vechile.color,
        plate : vechile.plate,
        capacity : vechile.capacity,
        vechileType : vechile.vechileType

    });
    const token = captian.generateAuthToken();
    res.status(201).json({token, captian});
}
