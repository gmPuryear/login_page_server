const express = require ('express');
const router = express.Router();

//@route:         GET api/auth
// @description:  Test Route
// @access value: Public (means if you need a token to access a specific route. Do you need to be authenticated? We dont need a token for this route)
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;