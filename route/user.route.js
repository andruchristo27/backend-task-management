import express from 'express'
import { deleteUser, getUser, insertUser, updateUser, } from '../controller/user.controller.js'

const router = express.Router()

router.post('/addUsers', insertUser)
router.get('/users', getUser)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

export default router