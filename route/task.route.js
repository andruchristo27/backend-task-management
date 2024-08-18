import express from 'express'
import { addTask, deleteTask, editTask, getTask } from '../controller/task.controller.js'

const router = express.Router()

router.post('/addTask', addTask)
router.get('/tasks', getTask)
router.put('/editTask/:id', editTask)
router.delete('/deleteTask/:id', deleteTask)
export default router