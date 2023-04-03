import { Router } from 'express'
import {
  createCoupon,
  verifyCoupon,
  deleteCoupon,
  findAllCoupons,
  findCoupon,
  searchCoupon,
  updateCoupon,
  searchCompany,
} from '../Controllers/CouponController.js'
import VerifyToken from '../Helper/VerifyToken.js'

const router = Router()

router.get('/company/:name', searchCompany.validator, searchCompany.controller)

// !create coupon
router.post('/create', VerifyToken, createCoupon.validator, createCoupon.controller)

// !to verify coupon
router.get('/verify_coupon/:id', verifyCoupon.controller)

// !find all coupons
router.get('/findall', findAllCoupons.controller)

// !search coupon
router.get('/search', searchCoupon.controller)

// !find perticular coupon
router.get('/:id', findCoupon.validator, findCoupon.controller)

// !update coupon
router.put('/:id', VerifyToken, updateCoupon.validator, updateCoupon.controller)

// !delete coupon
router.delete('/:id', VerifyToken, deleteCoupon.validator, deleteCoupon.controller)

export default router
