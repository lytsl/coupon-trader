import Coupon from '../Models/Coupon.js'
import User from '../Models/User.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

// !create mail
const sendMail = async (mailContent, mailSubject) => {
  var trasporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'coupontraderg5@gmail.com',
      pass: process.env.EMAILPASSWORD,
    },
  })

  var mailOptions = {
    from: 'coupontraderg5@gmail.com',
    to: 'coupontraderg5@gmail.com',
    subject: mailSubject,
    text: mailContent,
  }

  await trasporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // console.log(error);
      return false
    } else {
      // console.log(info);
      return true
    }
  })
}

// !create coupon
export const createCoupon = {
  validator: async (req, res, next) => {
    const { code, title, terms, expirydate, price, company, companylogo, category } = req.body

    if (
      !code ||
      !title ||
      !terms ||
      !expirydate ||
      !price ||
      !company ||
      !companylogo ||
      !category
    ) {
      return res.status(400).send('Please Fill all the Fields')
    }
    if (title.length < 3) {
      return res.status(400).send('Title shoud be more than 3 characters')
    }
    if (terms.length < 2) {
      return res.status(400).send('Terms and condidtions shoud be more than 2 characters')
    }

    next()
  },
  controller: async (req, res) => {
    const { code, title, terms, expirydate, price, company, companylogo, category } = req.body

    const sellerid = req.currUser._id
    try {
      const newCoupon = await Coupon.create({
        code,
        title,
        terms,
        expirydate,
        price,
        company,
        companylogo,
        category,
        sellerid,
      })

      await newCoupon.save()

      const coupon_id = newCoupon._doc._id

      const couponDetails = `Coupon Code: ${code} \nTitle: ${title} \nTerms and Conditions: ${terms} \nExpiry Date: ${expirydate} \nPrice: ${price} \nCompany: ${company}`

      const mailContent = `${couponDetails} \nUser Name: ${req.currUser.username} \nclick the below URL to verify coupon details. \nhttp://localhost:5000/api/coupon/verify_coupon/${coupon_id}`

      console.log('Coupon verification')

      const mailSubject = 'Coupon Trader Coupon verification'

      const emailSentRes = await sendMail(mailContent, mailSubject)

      return res.status(200).send({
        message: 'Coupon uploaded successful',
        ...newCoupon._doc,
      })
    } catch (e) {
      console.log(e)
      return res.status(500).send('Product upload Failed')
    }
  },
}

// !verify coupon
export const verifyCoupon = {
  controller: async (req, res) => {
    try {
      const findCoupon = await Coupon.findById(req.params.id)

      if (!findCoupon) {
        return res.status(401).send('Coupon is not found')
      }

      const verificationCoupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        {
          couponverified: true,
        },
        { new: true },
      )

      return res.status(200).send('Coupon Verification Successful')
    } catch (e) {
      console.log(e)
      return res.status(500).send('Coupon Verification failed')
    }
  },
}

// !update coupon
export const updateCoupon = {
  validator: async (req, res, next) => {
    const { code, title, terms, expirydate, price, company, category } = req.body

    if (!code || !title || !terms || !expirydate || !price || !company || !category) {
      return res.status(400).send('Please Fill all the Fields')
    }
    if (title.length < 3) {
      return res.status(400).send('Title shoud be more than 3 characters')
    }
    if (terms.length < 2) {
      return res.status(400).send('Terms and condidtions shoud be more than 2 characters')
    }

    next()
  },
  controller: async (req, res) => {
    const { code, title, terms, expirydate, price, company, category } = req.body

    try {
      const findCoupon = await Coupon.findById(req.body._id)

      if (!findCoupon) {
        return res.status(401).send('Coupon is not found')
      }
      if (findCoupon._doc.sellerid !== req.currUser._id.toString()) {
        return res.status(400).send('You are not authenticated to Update product')
      }

      const updateCoupon = await Coupon.findByIdAndUpdate(
        req.body._id,
        {
          code,
          title,
          terms,
          expirydate,
          price,
          company,
          category,
        },
        { new: true },
      )

      return res.status(200).send('Coupon Updation Successful')
    } catch (e) {
      console.log(e)
      return res.status(500).send('Coupon updation failed')
    }
  },
}

// !find coupon
export const findCoupon = {
  validator: async (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).send('please enter coupon id')
    }
    next()
  },
  controller: async (req, res, next) => {
    try {
      const findCoupon = await Coupon.findById(req.params.id)

      if (!findCoupon) {
        return res.status(401).send('Coupon not found')
      }

      const coupon = findCoupon._doc

      const seller = await User.findById(coupon.sellerid)

      if (!seller) {
        return res.status(401).send('Seller not found')
      }

      // const reviews = await Review.find({ productid: product._id });

      const { password, ...other } = seller._doc

      const responseData = {
        ...coupon,
        seller: {
          ...other,
        },
      }

      return res.status(200).json(responseData)
    } catch (e) {
      console.log(e)
      return res.status(500).send('Coupon finding failed')
    }
  },
}

// !find coupon
export const searchCompany = {
  validator: async (req, res, next) => {
    if (!req.params.name) {
      return res.status(400).send('please enter company name')
    }
    next()
  },
  controller: async (req, res, next) => {
    const query = req.params.name
    try {
      const responseData = await axios.get(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`,
        {
          transformResponse: (r) => r,
          headers: {
            Authorization: `Bearer ${process.env.CLEARBIT_KEY}`,
            // 'Content-Type': 'application/json',
          },
        },
      )
      return res.status(200).send(responseData.data)
    } catch (e) {
      console.log(e)
      return res.status(500).send('Company finding failed')
    }
  },
}

// !search coupon
export const searchCoupon = {
  controller: async (req, res) => {
    try {
      const keyword = req.query.keyword || ''
      const category = req.query.category || null
      const page = req.query.page || 1
      const limit = req.query.limit || 12

      const categoryArr = category ? category.split(',') : ''

      const queryForSearch = category
        ? {
            $and: [
              {
                $or: [
                  { title: { $regex: keyword, $options: 'i' } },
                  { description: { $regex: keyword, $options: 'i' } },
                ],
              },
              { category: { $in: categoryArr } },
            ],
          }
        : {
            $or: [
              { title: { $regex: keyword, $options: 'i' } },
              { description: { $regex: keyword, $options: 'i' } },
            ],
          }

      const result = await Coupon.find(queryForSearch)
        .skip((page - 1) * limit)
        .limit(limit)

      return res.send(result)
    } catch (e) {
      console.log(e)
      return res.status(500).send('Error Occured')
    }
  },
}

// ! find all coupon
export const findAllCoupons = {
  controller: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 12
      const category = req.query.category

      const skipIndex = (page - 1) * limit

      // use $dateFromString to parse expirydate strings into date objects
      const result = await Coupon.aggregate([
        {
          $match: { ...(category && { category }) },
        },
        {
          $facet: {
            parsedCoupons: [
              {
                $addFields: {
                  expiry_date: {
                    $dateFromString: { dateString: '$expirydate', format: '%m/%d/%Y' },
                  },
                },
              },
              { $sort: { expiry_date: 1 } },
              { $skip: skipIndex },
              { $limit: limit },
            ],
            totalCount: [
              {
                $count: 'total',
              },
            ],
          },
        },
      ]).exec()

      const parsedCoupons = result[0].parsedCoupons
      const totalCount = result[0].totalCount[0]?.total ?? 0

      if (parsedCoupons.length === 0) {
        return res.status(404).send('No More Coupons')
      }

      const hasMore = totalCount > skipIndex + limit

      res.status(200).send({ coupons: parsedCoupons, hasMore: hasMore, totalCount: totalCount })
    } catch (e) {
      console.error(e)
      return res.status(400).send('Internal server error')
    }
  },
}

// ! delete coupon
export const deleteCoupon = {
  validator: async (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).send('Please specify which coupon you want to delete')
    }
    next()
  },
  controller: async (req, res) => {
    try {
      const coupon = await Coupon.findById(req.params.id)

      if (!coupon) {
        return res.status(400).send('Coupon not found')
      }

      if (req.currUser._id.toString() !== coupon.sellerid) {
        return res.status(400).send('You are not authenticated to Delete coupon')
      }

      // await Review.deleteMany({ couponid: req.params.id });
      await Coupon.findByIdAndDelete(req.params.id)

      return res.status(200).send('Coupon deleted successfully')
    } catch (e) {
      console.log(e)
      return res.status(500).send('Coupon deletion failed')
    }
  },
}
