import express from 'express';
import { otpGen } from "../controllers/otpGen.js";
const router = express.Router();


router.post('/genOtp', otpGen)
   

export default router