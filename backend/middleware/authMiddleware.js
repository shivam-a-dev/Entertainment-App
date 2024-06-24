import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import expressAsyncHandler from 'express-async-handler';

export const Aunthenticated = expressAsyncHandler(async (req, res, next)=> {
    
    let token = await req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401)
            throw new Error('Not Authenticated')
        }

    } else {
        throw new Error('Not Authenticated')
    }

}) 

export const authorizeAdmin =  (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not Authorized')
    }
};