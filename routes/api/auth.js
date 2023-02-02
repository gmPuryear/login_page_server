const express = require ('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const User = require('../../models/User');

//@route:         GET api/auth
// @description:  Test Route
// @access value: Public (means if you need a token to access a specific route. Do you need to be authenticated? We dont need a token for this route)
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password') // '-password' leaves off the password in the data
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;