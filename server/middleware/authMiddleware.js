import jwt from 'jsonwebtoken';
import User from '../models/authModel.js'

export const authMiddleware =async(req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ message: 'user not autherized' });
    }
    try {
        const decoded = jwt.decode(token, process.env.jwtsecretKey)
        const user = await User.findById(decoded._id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

        req.user = user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}