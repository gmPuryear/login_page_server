const express = require ('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require ('jsonwebtoken');
const config = require('config');
const {check, validationResult, body} = require('express-validator');
const gravatar = require('gravatar'); // this is from the express-validator docs
const bcrypt = require('bcryptjs');

// vv DO NOT USE ONCE DEPLOYED vv
// var cors = require('cors');
// router.use(cors());

const cors = require('cors');

app.use(cors({
    origin: 'https://login-page-frontend-gp.herokuapp.com/'
}));

// *** This GET route is to get the user and make sure the user is validated, otherwise it will clear out the token and the object ***
//@route:         GET api/auth
// @description:  Test Route
// @access value: Public (means if you need a token to access a specific route. Do you need to be authenticated? We dont need a token for this route)
router.get('/', auth, async (req, res) => {
    try {
        // console.log(req);
        const user = await User.findById(req.user.id).select('-password') // '-password' leaves off the password in the data
        res.json(user); // were sending back the token here
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route:         POST api/auth
// @description:  Authenticate user & get token
// @access value: Public because we want to get the token to find the routes
router.post(
    '/',
    [
        check('email',
            "Please include a valid email")
            .isEmail(),
        check(
            'password',
            "Password is required")
            .exists()
    ],

    async (req, res) => {
        console.log(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) { // if there are errors, send 400 status and the error array
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body; // destructure response body so dont have to do req.body... all the time
        // See if user exists
        try {
            // check if user exists
            let user = await User.findOne({email}); // The findOne() method returns the value of the first element that passes a test.

            // If doesn't exist, send error 
            if (!user) {
                return res
                    .status(400)
                    .json({errors: [{msg: "Invalid credentials"}]})
            }

            const passwordIsMatch = await bcrypt.compare(password, user.password); // first param is the plain text pass

            // if not a match, then send error.
            if (!passwordIsMatch) {
                return res
                    .status(400)
                    .json({errors: [{msg: "Invalid credentials"}]});
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                // {expiresIn: 36000}, // when deploying change this expire back to 1 hour (3600 seconds)
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
);

module.exports = router;