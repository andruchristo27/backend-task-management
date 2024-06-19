import express from 'express'
import { login, loginstatus, register } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/loginstatus', loginstatus)


export default router