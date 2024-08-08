import express from 'express'
import {authenticate} from '../../backend/auth/verifyToken.js'
import { getCheckoutSession } from '../../backend/Controllers/bookingController.js'

const router = express.Router()

router.post('/checkout-session/:doctorId',authenticate,getCheckoutSession)

export default router