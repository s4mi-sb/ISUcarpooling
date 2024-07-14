import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import userOTPverification from "../models/userotpverification.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();



let transpoter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
    },
});

transpoter.verify((error,success) =>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Server is ready to take our messages");
    }
})

export const signup = async (req,res, next) =>{
    const {username, password, email} = req.body;
    if (password.length<8) {
        return next(errorHandler(404,'Password is short'));
    }
    const cryptedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username,password: cryptedPassword,email, verified: false});
    try {
        await newUser.save().then((result) => {

            sendOTPverifcationEmail(result,res);

        });
       
        const validUser = await User.findOne({email});
        res.status(200).json(validUser._id);
        
    } catch (error) { 
        next(error);
    }
};

const sendOTPverifcationEmail = async ({_id,email}, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random()*9000)}`;
        

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify your email for ISUcarpool",
            html: `
            <p>Enter this verification code <b> ${otp} </b> in the app to verify your email.</p>
            <p><b>IF YOU DID NOT REQUEST A VERIFICATION CODE PLEASE IGNORE THIS EMAIL!</b></p>
            <p>The code <b>expires in an hour.</b></p></br>
            <p>Best regards,</p></br><p>ISUcarpool</p></br><p>PLEASE DO NOT REPLY TO THIS EMAIL!</p>`,

        };

        const saltRounds  = 10;
        const hashedOTP = await bcryptjs.hashSync(otp,saltRounds);
        const newOTPverification = await new userOTPverification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,

        });
        await newOTPverification.save();
        await transpoter.sendMail(mailOptions);

    } catch (error) {
        return next(error);
        
    }
}

export const verifyOTP = async (req,res,next) =>{
    try {
        let userID = req.params.id;
        let otp = req.body;
        if(!otp){
            next(errorHandler(404,"Empty code is not allowed"));
        }
        else{

        const userOTPrecords = await userOTPverification.find({
            userId: userID,
        });
        const userRecordID = userOTPrecords[0].userId;

        if(userRecordID.length <= 0){
            next(errorHandler(404,"Account does not exist or has already been verified. Please log in or sign up."));
        }
        else {
            const {expiresAt} = userOTPrecords[0];
            const hashedOTP = userOTPrecords[0].otp;
            let obj = otp;
            
            if(expiresAt < Date.now()){
                userOTPverification.deleteMany({userId: userID});
                next(errorHandler(404,"Code has expired. Please request again."))
            }
            else{
                const validOTP = bcryptjs.compareSync(obj.otp, hashedOTP);
                if(!validOTP){
                    next(errorHandler(404,"Invalid code. Please try again!"));
                }
                else{
                    await User.updateOne({_id: userID}, {verified: true});
                    const result = await userOTPverification.deleteMany({userId : userID});
                    res.json({status: 'verified'});
                }
            }
        }
        }
    } catch (error) {
            next(error);
    }
}

export const resendOTP = async (req,res,next) =>{
    try {
        let userId = req.params.id;
        let {email} = req.body;

        if(!email){
            next(errorHandler(404,"Empty sets not allowed"));
        }
        else{
            await userOTPverification.deleteMany({userId});
            await User.updateOne({verified: false});
            res.status(202).clearCookie('accessToken');
            
            const validUser = await User.findOne({email});
            if (!validUser) {
                return next(errorHandler(404,'Incorrect Email'));
            }
            res.json({status: 'Email sent'});

            sendOTPverifcationEmail({_id: userId, email}, res);
            
            }
    } catch (error) {
        next(error);
    }
}

export const newPassword = async (req,res,next)=>{
    try {
        if(req.body.newPassword !== req.body.confirmPassword){
            return next(errorHandler(404,'Passwords do not match'));
        }
        const newPassword = bcryptjs.hashSync(req.body.newPassword, 10);
        await User.findByIdAndUpdate(req.params.id,{
            $set:{
                password: newPassword,
            }
        }, {new:true});
        res.status(200).json("Success");
    } catch (error) {
        next(error);
    }
}

export const forgotPasssword = async(req,res,next)=>{
    try {
        const {email} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return next(errorHandler(404,'User not found. Please sign up'));
        }
        user = await User.findOneAndUpdate({email},{
            $set:{
                verified: false,
            }
        }, { new:true});
        res.status(200).json(user._id);
        sendOTPverifcationEmail({_id: user._id, email}, res);
    } catch (error) {
        next(error)
    }
}


export const signin = async (req,res,next) =>{
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        res.status(202).clearCookie('accessToken');
        
        if (!validUser) {
            return next(errorHandler(404,'Incorrect Email'));
        }
        if(!validUser.verified){
            return next(errorHandler(404,'Please verify your email'));
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401,'Incorrect Password'));
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_Secret, { expiresIn: '1h' });
  

        const {password: pass, messages: mess, ...restInfo} = validUser._doc;

        res.cookie('accessToken', token, {httpOnly: true, maxAge: 3600000}).status(200).json(restInfo);
    } catch (error) {
        next(error);
    }
}

export const signout = async (req,res,next) =>{
    try {
        res.clearCookie('accessToken');
        res.status(200).json({message: 'User has been logged out'});
    } catch (error) {
        next(error);
    }
}