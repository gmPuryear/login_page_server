const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator'); // this is from the express-validator docs
const User = require("../../models/User"); // bringing in user model

// @route:        POST api/users
// @description:  Register user
// @access value: Public (means if you need a token to access a specific route. Do you need to be authenticated? We dont need a token for this route)
// router.post(
//     '/',
//     [
//         check('name', 'Name is required')
//             .not()
//             .isEmpty(),
//         check('email', 'Please include a valid email').isEmail(),
//         check(
//             'password',
//             'Please enter a password with 8 or more characters'
//         ).isLength({min: 8})
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({errors: errors.array()})
//         }
//         // destructuring to pull out these from res.body
//         const { name, email, password} = res.body;
//
//         try {
//             // See if user exists
//             let user = await User.findOne({email});
//
//             if (user) {
//                 res.status(400).json({errors: [{msg: 'User already exists'}]});
//             }
//             // Get users gravatar
//
//             // Encrypt password using bcrypt
//
//             // Return JSON web token
//             res.send('User route');
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server error')
//         }
//
//
//
//
//     }
// );
//
// module.exports = router;