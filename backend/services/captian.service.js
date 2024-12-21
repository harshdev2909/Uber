const captainModel = require('../models/captian.model');

module.exports.createCaptain = async ({
    firstname,
    lastname,
    email,
    password,color,plate,capacity,vechileType
    }) => {
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }
    
    const captain = captainModel.create({
        fullname: {
        firstname,
        lastname
        },
        email,
        password,
        vechile: {  
        color,
        plate,
        capacity,
        vechileType
        }
    });
    return captain;
}