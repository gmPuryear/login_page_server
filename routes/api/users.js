const express = require('express');
const router = express.Router();
const gravatar = require("gravatar");
const User = require('../../models/User'); // bringing in user model
const bcrypt = require ('bcryptjs'); // for password encryption
const jwt = require ('jsonwebtoken');
const config = require('config');
const {check, validationResult, body} = require('express-validator'); // this is from the express-validator docs

// @route:        POST api/users
// @description:  Register user
// @access value: Public (means if you need a token to access a specific route. Do you need to be authenticated? We dont need a token for this route)

// vv DO NOT USE ONCE DEPLOYED vv
var cors = require('cors');
router.use(cors());



// *** Middleware has the access to the request object, responses object, and next, it can process the request before the
// server send a response. An Express-based application is a series of middleware function calls ***

router.post('/',
    [
        check('email', "Please enter a valid email")
            .isEmail()
            // these two are used to just check if the Email is actually inputted
            .not()
            .isEmpty(),
        check('password', "Password must have more than 6 characters")
            .isLength({min: 6})
            .not()
            .isEmpty()
    ],

    async (req, res) => {
        console.log(req.body); // in order for this to work and receive the POST info, we need to initialize the middleware in server.js
        const errors = validationResult(req);
        if (!errors.isEmpty()) { // if there are errors, send 400 status and the error array
            return res.status(400).json({errors: errors.array()});
        }

        const {firstName, lastName, email, password} = req.body; // destructure response body so dont have to do req.body... all the time
        // See if user exists
        try {
            // If user exists, send error
            let user = await User.findOne({email}); // Returns Bool.The findOne() method returns the value of the first element that passes a test.
            if (user) {
                return res.status(400).json({errors: [{msg: "User already exists"}]})
            }
            // Get user's gravatar
            const avatar = gravatar.url(email, {
                s: "200", // size
                r: "pg", // rating so no naked people
                d: "mm" // stock user icon
            })

            // *** CREATE USER ***
            user = new User({ // creating a new instance of a user with the fields
                firstName,
                lastName,
                email,
                password,
                avatar
                });

            // *** HASH PASSWORD ***
            // ** Anything that returns a promise you make sure to put await. If not using async, await you would use the .thens
            // encrypt password using bcrypt
            const salt = await bcrypt.genSalt(10); // the higher the number the more secure but higher = slower

            user.password = await bcrypt.hash(password, salt) // creates a hash and puts it into user password. We get a promise from bcrypt gen salt

            await user.save() // saves user to database



            // *** Get payload that includes user ID ***
            // return JSON web token so that user can get logged in right away and they need a token
            const payload = {
                user: {
                    id: user.id
                }
            }
            // *** Sign token, pass in payload, pass in secret, pass in expire time, then get error or token,
            // If no error then send toekn to client ***
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: 360000}, // when deploying change this expire back to 1 hour (3600 seconds)
                (err, token) => {
                if (err) throw err;
                res.json({token});
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error")
        }

    }
)

module.exports = router;