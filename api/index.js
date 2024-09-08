import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import path from 'path'
import dotenv from 'dotenv';
import authRouter from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import rideRouter from './routes/rideShareRoute.js'
import cookieParser from 'cookie-parser';


dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
    }).catch((err) =>{
        console.log(err.message);
    });
const app = express();



app.listen(3000,() =>{
    console.log("Server is running in port 3000");
});

app.use(cors({
    origin: 'https://iastatecarpooling.vercel.app',
    methods : ["POST","GET", "DELETE"],
    credentials: true
}));

const _dirname = path.resolve();

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/user", userRoute);

app.use("/api/rideShare", rideRouter);


// app.use(express.static(path.join(_dirname,'/client/dist')));

// app.get('*', (req,res)=>{
//     res.sendFile(path.join(_dirname,'client','dist','index.html'));
// });


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

