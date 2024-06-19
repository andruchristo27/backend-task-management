import express from 'express'
import { editProvider, getProfiderActive, getProfiderById, insertProvider, searchProvider } from '../controller/provide.controller.js'

const router = express.Router()

// router.post('/providers', insertProvider)
router.post('/provide', insertProvider)
router.get('/provider/:id', getProfiderById)
router.put('/provider/status', editProvider)
router.get('/provideractive', getProfiderActive)
router.post('/searchproviderkey', searchProvider)
export default router