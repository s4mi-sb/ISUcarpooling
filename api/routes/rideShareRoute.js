import express from 'express'
import { createRide,deleteRide, getRide, searchRides, updateRide } from '../controllers/rideController.js';
import { verifyUser } from '../utils/verify.js';

const router = express.Router();

router.post('/rideUpload',verifyUser,createRide);
router.delete('/deleteRide/:id', verifyUser,deleteRide);
router.post('/editRide/:id', verifyUser,updateRide);
router.get('/getRide/:id', getRide);
router.get('/searchRides', searchRides);
export default router;