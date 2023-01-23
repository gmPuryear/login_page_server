const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

// @route:        POST api/users
// @description:  Register user
// @access value: Public (means if you need a token to access a specific route. Do you need to be authenticated? We dont need a token for this route)
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('User route')
});

module.exports = router;