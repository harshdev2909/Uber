const mongoose = require('mongoose');
require('dotenv').config();

function connectDB() {
    mongoose.connect(process.env.MONGO_CONNECTION_URL
    ).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err))
}
module.exports = connectDB;