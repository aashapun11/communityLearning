const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        token = token.split(' ')[1]; // extract token from "Bearer <token>"

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        next();

    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = protect;