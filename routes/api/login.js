// const express = require('express');
// const router = express.Router();
// const User = require('../../models/User');
// const jwt = require ('jsonwebtoken');
// const bcrypt = require ('bcryptjs'); // for password encryption
// const {check, validationResult, body} = require('express-validator'); // this is from the express-validator docs
// const { Router } = require('express');


// router.post('/', 
// [
//     check('email', "Please enter a valid email")
//         .isEmail()
//         // these two are used to just check if the Email is actually inputted
//         .not()
//         .isEmpty(),
//     check('password', "Password must have more than 6 characters")
//         .isLength({min: 6})
//         .not()
//         .isEmpty()
// ],

// async(req, res) => {
//     if (!errors.isEmpty()) { // if there are errors,
//         return res.status(400).json({errors: errors.array()}); //send 400 status and the error array
//     }

//     const {email, password} = req.body;
//     console.log(email);

//     try {
//         let user = await User.findOne({email});
//         if (!user) {
//             return res.status(400).json({errors: [{msg: "Invalid email or password..."}]});
//             }
//             const isValid = await bcrypt.compare(password, user.password);
//             if (!isValid) {
//                 return res.status(400).json({errors: [{msg: "Invalid email or password..."}]});
//             }
//             const token = genAuthToken(user);

//             res.send(token);
//         }
// })

// module.exports = router;

