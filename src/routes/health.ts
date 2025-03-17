import express from 'express';
import { getApiStatus } from '../controllers/healthController';

const router = express.Router();

router.get('/', getApiStatus);

export default router;
