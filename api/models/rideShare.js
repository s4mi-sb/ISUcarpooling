import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    pickup:{
        type: String,
        required: true,
    },
    dropoff : {
        type: String,
        required: true,
    },
    contact: { 
        type: String,
    },
    passengers: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    luggage: {
        type: Boolean,
        required: true
    },
    rules:{
        type: String
    },
    userRef: {
        type: String,
    },
    departureTime: {
        type: String,
        required: true,
    },
    luggageSpace:{
        type: Number,
    },
    time:{
        type: String,
    },
    date:{
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    profile:{
        type: String,
        default: 'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'
    },


}, {timestamps: true});

const RideInfo = mongoose.model('RideInfo', rideSchema);

export default RideInfo;