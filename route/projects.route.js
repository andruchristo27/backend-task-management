import express from 'express'
import { addProject, deleteProject, editProject, getProject } from '../controller/projects.controller.js'

const router = express.Router()

router.post('/addProject', addProject)
router.get('/projects', getProject)
router.put('/editProject/:id', editProject)
router.delete('/deleteProject/:id', deleteProject)

export default router