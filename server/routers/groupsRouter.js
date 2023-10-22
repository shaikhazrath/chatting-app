import express from 'express'
import { createGroup, getUserGroups, joinGroup, searchGroups } from '../controllers/groupController.js'
const router = express.Router()
import { authMiddleware } from '../middleware/authMiddleware.js'
router.post('/createGroup',authMiddleware, createGroup)
router.get('/mygroups',authMiddleware,getUserGroups)
router.get('/groups/search',authMiddleware, searchGroups);
router.get('/groups/join/:groupId',authMiddleware, joinGroup);


export default router