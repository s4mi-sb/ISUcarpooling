import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) =>{
    const token = req.cookies.accessToken;
    if(!token) {
        return next(errorHandler(401, "You session has expired! Please sign in again."));
    }
    jwt.verify(token, process.env.JWT_Secret, (err,user) =>{
        if(err){
            return next(errorHandler(403, "Forbidden"));
        }
        req.user = user;
        next();

    });


};