import express from 'express'
import { editStatusAppoint, getAppointConfirm, getAppointPending } from '../controller/appointments.controller.js'

const router = express.Router()

router.get('/appointPending/:id', getAppointPending)
router.get('/appointConfirm/:id', getAppointConfirm)
router.put('/appoint/status', editStatusAppoint)

export default router