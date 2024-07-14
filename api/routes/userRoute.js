import express from 'express';
import { deleteUser, updateUser,getRides, getRider} from '../controllers/userControllers.js';
import { verifyUser } from '../utils/verify.js';

const router = express.Router();

router.post('/update/:id', verifyUser, updateUser);

router.delete('/delete/:id', verifyUser, deleteUser);

router.get('/availableRides/:id',verifyUser,getRides);

router.get('/:id', verifyUser,getRider);


export default router; 