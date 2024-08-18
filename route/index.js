import express from 'express'
import userRoute from '../route/user.route.js'
import authRoute from './auth.route.js'
import taskRoute from './task.route.js'
import projectsRoute from './projects.route.js'
import { authenticateToken } from '../middleware/validate.middleware.js'

const router = express()

router.use(authRoute)
router.use(authenticateToken, userRoute)
router.use(authenticateToken, taskRoute)
router.use(authenticateToken, projectsRoute)

// router.use(siswaRoute)
// router.use(passport.authenticate('jwt', { session: false }), siswaRoute)


export default router