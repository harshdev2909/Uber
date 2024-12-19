const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})