import express from 'express';
import { getBeans, addBean, deleteBean } from '../controllers/beansController';

const router = express.Router();

router.get('/beans', getBeans);

router.post('/beans', addBean);

router.delete('/beans/:id', deleteBean);

export default router;
