import express from 'express';
import { forgotPasssword, newPassword, resendOTP, signin, signout, signup, verifyOTP } from '../controllers/authControl.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verifyOTP/:id", verifyOTP);
router.post("/resendOTP/:id", resendOTP);
router.get('/signout', signout);
router.post('/forgotPassword', forgotPasssword);
router.post('/newPassword/:id',newPassword);

export default router;