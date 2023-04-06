import { Router } from 'express'
import { makePayment, webhook } from '../Controllers/PaymentController.js'
import VerifyToken from '../Helper/VerifyToken.js'

const router = Router()

router.post('/create-checkout-session', VerifyToken, makePayment.controller)
router.post('/webhook', webhook.controller)

export default router
