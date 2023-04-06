import { Router } from 'express'
import VerifyToken from '../Helper/VerifyToken.js'
import { userTransction } from '../Controllers/TraceController.js'

const router = Router()

router.get('/:id', VerifyToken, userTransction.controller)

export default router
