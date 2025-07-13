import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createParcel } from '../controllers/parcelController.js';

const router = express.Router();

router.post('/create', verifyToken, createParcel);

export default router;
