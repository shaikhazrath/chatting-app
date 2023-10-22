import express from 'express'
const router = express.Router()
import { authMiddleware } from '../middleware/authMiddleware.js'
import { groupMessages } from '../controllers/messageController.js'
router.get('/groupmessages/:groupId',authMiddleware,groupMessages)


export default router