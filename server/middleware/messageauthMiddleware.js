import jwt from 'jsonwebtoken';
import User from '../models/authModel.js'

export const messageauthmiddleware = async (token) => {
    if (!token) {
      throw new Error('User not authorized: Token missing');
    }
    try {
      const user = jwt.decode(token, process.env.jwtsecretKey);
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  };