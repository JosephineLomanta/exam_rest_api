import express from 'express'
import { getMenu, getMenus, addMenu, updateMenu, deleteMenu } from '../controllers/menus.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getMenus)
router.get('/:id', verifyToken, getMenu)
router.post('/', verifyToken, addMenu)
router.put('/:id', verifyToken, updateMenu)
router.delete('/:id', verifyToken, deleteMenu)

export default router