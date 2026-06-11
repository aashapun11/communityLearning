const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const optionalAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        }

        next(); // always continues — logged in or not

    } catch (err) {
        next(); // invalid token → just continue as guest
    }
};

module.exports = optionalAuth;