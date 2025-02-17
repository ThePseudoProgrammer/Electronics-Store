const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        const user = await User.findById(decoded.userId);
        if (!user.isAdmin) {
            throw new Error();
        }

        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Требуются права администратора' });
    }
}; 