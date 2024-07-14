import RideInfo from "../models/rideShare.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcrypts from 'bcryptjs';


export const updateUser = async (req, res, next) => {
    if(req.params.id !== req.user.id){
        return next(errorHandler(401, "Your session has expired! Please sign in again"));
    }
    if(req.body.email && !/iastate\.edu$/.test(req.body.email)){
        return next(errorHandler(401, "Your email should be an iastate domain"));
    }
    try {
        if(req.body.password){
            req.body.password = bcrypts.hashSync(req.body.password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profile: req.body.profile
            }
        }, {new:true});
        await RideInfo.findOneAndUpdate({userRef: req.params.id},{
            $set:{
                profile: req.body.profile,
            }
        }, { new:true});
        const {password, ...rest} = updateUser._doc

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
export const deleteUser = async (req,res,next) =>{
    if(req.params.id !== req.user.id){
        return next(errorHandler(401, "You are not authorized to delete this account"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        await RideInfo.deleteMany({userRef :req.params.id});
        res.clearCookie('accessToken');
        res.status(200).json({message: "User has been deleted"});
    } catch (error) {
        next(error);
    }
}
export const getRides = async (req,res,next) =>{
    try {
        if(req.params.id !== req.user.id){
            return next(errorHandler(401, "You are not authorized to delete this account"));
        }
        const rides = await RideInfo.find({userRef: req.params.id});
        res.status(200).json(rides);
    } catch (error) {
        next(error);
    }
}
export const getRider = async (req,res,next)=>{
    try {
        
        const user = await User.findById(req.params.id);
        if(!user){
            return next(errorHandler(401,'Unable to find user!'));
        }
        const{password: pass, profile: pr, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
    

}
