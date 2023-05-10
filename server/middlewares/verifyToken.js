const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Missing auth header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        if (user.email !== decodedToken.email) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decodedToken.userId;
        req.email = decodedToken.email;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = verifyToken;