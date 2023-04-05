import Coupon from '../Models/Coupon.js'
import User from '../Models/User.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import axios from 'axios'
import { getColorFromURL } from 'color-thief-node'
import invert from 'invert-color'

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

function rgbToHex(x) {
  const [r, g, b] = x
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
}

// !create coupon
export const createCoupon = {
  validator: async (req, res, next) => {
    const { code, title, terms, expirydate, price, company, companylogo, category, url } = req.body

    if (
      !code ||
      !title ||
      !terms ||
      !expirydate ||
      !price ||
      !company ||
      !companylogo ||
      !category ||
      !url
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
    const { code, title, terms, expirydate, price, company, companylogo, category, url } = req.body

    const sellerid = req.currUser._id
    try {
      // const img = new Image()

      // img.addEventListener('load', async function () {
      //   dmcolor = await ColorThief.getColor(img)
      //   dmcolor = rgbToHex(dmcolor)
      //   console.log(dmcolor)
      // })

      // img.crossOrigin = 'Anonymous'
      // img.src = companylogo
      // const response = await axios.get(companylogo, { responseType: 'arraybuffer' })
      // const buffer = Buffer.from(response.data, 'utf-8')
      // const img = await loadImage(companylogo)
      // const dmcolor = await ColorThief.getColor(img.src)
      // dmcolor = rgbToHex(dmcolor)
      let dmcolor = await getColorFromURL(companylogo, 1)
      console.log(dmcolor)
      dmcolor = rgbToHex(dmcolor)
      const incolor = invert(dmcolor)
      console.log(companylogo)

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
        dmcolor,
        incolor,
        url,
      })

      await newCoupon.save()

      const coupon_id = newCoupon._doc._id
      const couponDetails = `Coupon Code: ${code} \nTitle: ${title} \nTerms and Conditions: ${terms} \nExpiry Date: ${expirydate} \nPrice: ${price} \nCompany: ${company}`
      const mailContent = `${couponDetails} \nUser Name: ${req.currUser.username} \nclick the below URL to verify coupon details. \nhttp://localhost:5000/api/coupon/verify_coupon/${coupon_id}`
      const mailSubject = 'Coupon Trader Coupon verification'

      console.log('Coupon verification')

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
// export const createCoupon = {
//   validator: async (req, res, next) => {
//     const { code, title, terms, expirydate, price, company, companylogo, category, url } = req.body

//     if (
//       !code ||
//       !title ||
//       !terms ||
//       !expirydate ||
//       !price ||
//       !company ||
//       !companylogo ||
//       !category ||
//       !url
//     ) {
//       return res.status(400).send('Please Fill all the Fields')
//     }
//     if (title.length < 3) {
//       return res.status(400).send('Title shoud be more than 3 characters')
//     }
//     if (terms.length < 2) {
//       return res.status(400).send('Terms and condidtions shoud be more than 2 characters')
//     }

//     next()
//   },
//   controller: async (req, res) => {
//     const { code, title, terms, expirydate, price, company, companylogo, category, url } = req.body

//     const sellerid = req.currUser._id
//     try {
//       const newCoupon = await Coupon.create({
//         code,
//         title,
//         terms,
//         expirydate,
//         price,
//         company,
//         companylogo,
//         category,
//         sellerid,
//         dmcolor,
//         incolor,
//         url,
//       })

//       await newCoupon.save()

//       const coupon_id = newCoupon._doc._id

//       const couponDetails = `Coupon Code: ${code} \nTitle: ${title} \nTerms and Conditions: ${terms} \nExpiry Date: ${expirydate} \nPrice: ${price} \nCompany: ${company}`

//       const mailContent = `${couponDetails} \nUser Name: ${req.currUser.username} \nclick the below URL to verify coupon details. \nhttp://localhost:5000/api/coupon/verify_coupon/${coupon_id}`

//       console.log('Coupon verification')

//       const mailSubject = 'Coupon Trader Coupon verification'

//       const emailSentRes = await sendMail(mailContent, mailSubject)

//       return res.status(200).send({
//         message: 'Coupon uploaded successful',
//         ...newCoupon._doc,
//       })
//     } catch (e) {
//       console.log(e)
//       return res.status(500).send('Product upload Failed')
//     }
//   },
// }

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
      const page = Number(req.query.page || 1)
      const itemsPerPage = Number(req.query.limit) || 12
      const category = req.query.category
      let query = {}
      if (category) {
        query.category = category
      }

      const totalCount = await Coupon.countDocuments(query)
      const totalPages = Math.ceil(totalCount / itemsPerPage)
      if (totalCount === 0) {
        return res.status(404).send(`There are no coupons in this category`)
      }
      if (page > totalPages) {
        return res.status(404).send(`Invalid page number. There are only ${totalPages} pages.`)
      }

      const parsedCoupons = await Coupon.find(query)
        .sort({ expirydate: 1 })
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage)

      if (parsedCoupons.length === 0) {
        return res.status(404).send('No Coupons Found')
      }

      const hasMore = page < totalPages
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
