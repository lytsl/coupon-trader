import mongoose from 'mongoose'

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    terms: {
      type: String,
      required: true,
    },
    expirydate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    companylogo: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sellerid: {
      type: String,
      required: true,
    },
    buyerid: {
      type: String,
    },
    couponverified: {
      type: Boolean,
      default: false,
    },
    dmcolor: {
      type: String,
      required: true,
    },
    incolor: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const Coupon = mongoose.model('Coupon', CouponSchema)

export default Coupon
