import { log } from "console";
import RideInfo from "../models/rideShare.js";
import { errorHandler } from "../utils/error.js";

export const createRide = async (req,res,next) =>{
    try {
        const ride = await RideInfo.create(req.body);
        return res.status(201).json(ride);
    } catch (error) {
        next(error)
    }
}

export const deleteRide = async (req,res,next) =>{
    try {
        const ride = await RideInfo.findById(req.params.id);
        if(!ride){
            return next(errorHandler(401, "Ride not found!"));
        }
        if(ride.userRef !== req.user.id){
            return next(errorHandler(401, "You are not authorized to delete this ride"));
        }
        await RideInfo.findByIdAndDelete(req.params.id);
        res.status(200).json('Ride has been deleted');
    } catch (error) {
        next(error);
    }
}

export const updateRide = async (req,res,next) =>{   
    try {
        const ride = await RideInfo.findById(req.params.id);
        if(!ride){
            return next(errorHandler(401, "Ride not found!"));
        }
        if(ride.userRef !== req.user.id){
            return next(errorHandler(401, "You are not authorized to delete this ride"));
        } 
        const updateRide = await RideInfo.findByIdAndUpdate(
            req.params.id, req.body, {new: true}
        );
        res.status(200).json(updateRide);
    } catch (error) {
        next(error);
    }
}
export const getRide = async (req,res,next) =>{
    try {
        const ride = await RideInfo.findById(req.params.id);
        res.status(200).json(ride);
    } catch (error) {
        next(error);
    }
}
export const searchRides = async (req,res,next)=>{
    try {
        const showRides = parseInt(req.query.showRides) || 12;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let luggage = req.query.luggage;
        if(luggage === undefined || luggage === 'false'){
            luggage = {$in: [false, true]};
        }
        const sort = req.query.sort || 'createdAt';
        const searchValue = req.query.searchValue || '';
        const order = req.query.order || 'desc';
        let time = req.query.time || ['Morning', 'Afternoon', 'Noon'];
        if(req.query.time === 'all'){
            time = {$in: ['Morning', 'Afternoon', 'Noon']}
        }
        let passengers = req.query.passengers || [1,2,3,4];
        if(req.query.passengers === '0'){
            passengers = {$in: [1,2,3,4]};
        }
        
        const rides = await RideInfo.find({
            $or:[
                {title : {$regex: searchValue, $options: 'i'}},
                {pickup : {$regex: searchValue, $options: 'i'}},
                {dropoff: {$regex: searchValue, $options: 'i'}}
            ],
            luggage,
            passengers,
            time
        }).sort({[sort]: order}).limit(showRides).skip(startIndex)
        
        return res.status(200).json(rides);

    } catch (error) {
        next(error);
    }
}