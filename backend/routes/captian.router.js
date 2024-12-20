const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const registerCaptian = require('../controllers/captian.controller'); 


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long"),
],
  registerCaptian.registerCaptian
)
module.exports = router;