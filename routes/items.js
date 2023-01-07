import express from 'express'
import { getItem, getItems, addItem, updateItem, deleteItem } from '../controllers/items.js' 
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getItems)
router.get('/:id', verifyToken, getItem)
router.post('/', verifyToken, addItem)
router.put('/:id', verifyToken, updateItem)
router.delete('/:id', verifyToken, deleteItem)

export default router