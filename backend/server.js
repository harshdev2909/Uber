const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/db');
app.use(cors());
const cookieParser = require('cookie-parser')
app.use(express.json());
const port = process.env.PORT || 5000;
connectDB();
app.use(cookieParser());
const Router = require('./routes/user.routes');
app.use("/users",Router)
// app.use("/",(req,res)=>{
//     res.send("Hello World");
// })

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})