import express from 'express'
import { getCafe, getCafes, addCafe, updateCafe, deleteCafe } from '../controllers/cafes.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getCafes)
router.get('/:id', verifyToken, getCafe)
router.post('/', verifyToken, addCafe)
router.put('/:id', verifyToken, updateCafe)
router.delete('/:id', verifyToken, deleteCafe)

export default router