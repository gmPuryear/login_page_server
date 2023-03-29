const jwt = require('jsonwebtoken');
const config = require('config');

// *** This is customn middleware used to verify the JSON web token that comes from the client and authenticate our users ***

// exporting middleware function that takes in 3 things which is that has access to request and response objects. Next is a callback
// is what we have to run to go on to next piece of middleware

module.exports = function (req, res, next) {

    // Get token from header
    console.log(req);

    const token = req.header('x-auth-token');

    // check if no token at all and route is protected
    if (!token) {
        return res.status(401).json({msg: "No token authorization, authorization denied"}) // not authorized
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')) // decodes the token

        req.user = decoded.user;
        next();
    } catch (err) { // if token but not valid
        res.status(401).json({msg: "Token is not valid"})
    }
}