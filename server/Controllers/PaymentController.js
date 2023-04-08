import Coupon from '../Models/Coupon.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'

dotenv.config()

const stripe = Stripe(process.env.STRIPE_KEY)

// !make payment
export const makePayment = {
  controller: async (req, res) => {
    const coupon_id = req.body.couponid
    const customer = await stripe.customers.create({
      metadata: {
        userid: req.currUser._id,
        couponid: coupon_id,
        // email: req.currUser.email,
      },
    })
    const accessToken = JWT.sign(
      {
        userid: req.currUser._id,
        couponid: coupon_id,
      },
      process.env.JWT_SEC_KEY,
      { expiresIn: '1h' },
    )
    const verificationLink = encodeURI(accessToken.replace(/\./g, '%dot%'))

    const findCoupon = await Coupon.findById(coupon_id)
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      // customer_email: req.currUser.email,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: findCoupon.title,
              images: [findCoupon.companylogo],
              description: findCoupon.terms,
              // expirydate: findCoupon.expirydate,
              // company: findCoupon.company,
              // category: findCoupon.category
            },
            unit_amount: findCoupon.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success/?code=${findCoupon.code}&token=${verificationLink}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-fail`,
    })

    res.send({ url: session.url, couponid: coupon_id })
  },
}

// !create order
const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart)

  // paymentIntentId: data.payment_intent,
  // products: Items,
  //! dateoftransaction
  const newOrder = new Transaction({
    sellerid: customer.metadata.userid,
    buyerid: data.customer,
    transactionid: data.payment_intent,
    couponid: Items,
    amount: data.amount_total,
    paymentstatus: data.payment_status,
  })

  // ! save buyerid in coupon database
  // const updateCoupon = new Coupon({
  //     buyerid: customer.metadata.userid
  // });

  try {
    const saved = await Transaction.save()

    console.log('Processed order:', saved)
  } catch (e) {
    console.log(e)
  }
}

// !stripe webhook
export const webhook = {
  // controller: express.raw({ type: 'application/json' }), (req, res) => {
  controller: async (req, res) => {
    // const endpointSecret = "whsec_6ef8177b63be8070be66e35a742ba2fbd2103958ed5ee3c36bfbac2a61e23892";
    let endpointSecret

    // endpointSecret = "whsec_6ef8177b63be8070be66e35a742ba2fbd2103958ed5ee3c36bfbac2a61e23892";

    const sig = req.headers['stripe-signature']

    let data
    let eventType

    if (endpointSecret) {
      let event
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
        console.log('webhook verify')
      } catch (err) {
        console.log(err)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
      data = event.data.object
      eventType = event.type
    } else {
      data = req.body.data.object
      eventType = req.body.type
    }

    // Handle the event
    if (eventType === 'checkout.session.completed') {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          // console.log(customer);
          // console.log("data:", data);
          createOrder(customer, data)
        })
        .catch((err) => console.log(err.message))
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end()
  },
}

// !verify payment
export const verifyPayment = {
  controller: async (req, res) => {
    console.log('in verify Payment')
    console.log(req.query.verify_payment_token)
    let verify_payment_token = req.query.verify_payment_token
    if (!verify_payment_token) {
      return res.status(400).send('Invalid Payment link')
    }

    try {
      // verify_payment_token = verify_payment_token.replace(/%dot%/g, '.')
      const verified = JWT.verify(verify_payment_token, process.env.JWT_SEC_KEY)
      if (verified.userid != req.currUser._id) {
        return res.status(400).send('User is not verified')
      }
      // const findUser = await User.findOne({
      //   _id: verified.userid,
      // })
      // const coupon = await Coupon.findById(verified.couponid)
      const couponUpdated = await Coupon.findByIdAndUpdate(verified.couponid, {
        buyerid: verified.userid,
      })

      res.status(201).send('payment verification successful')
    } catch (e) {
      console.log(e)
      return res.status(400).send('Payment verification failed')
    }
  },
}

// !sendPaymentVerification
export const sendEmailVerification = {
  controller: async (req, res, next) => {
    try {
      const accessToken = JWT.sign(
        {
          id: req.currUser._id,
        },
        process.env.JWT_SEC_KEY,
        { expiresIn: '1d' },
      )

      const verificationLink = encodeURI(
        `${process.env.CLIENT_URL}/verify_email/${accessToken.replace(/\./g, '%dot%')}`,
      )

      const mailContent = `Hi ${req.currUser.username} \nclick the below URL to verify your email address. \n${verificationLink} \nIf you will not start the verification process now, than this link will expire in 24hours.`

      console.log('Email verification')

      const mailSubject = 'Coupon Trader Email verification'

      const emailSentRes = await sendMail(mailContent, mailSubject, req.currUser)

      // if (emailSentRes) {
      return res.status(200).send('Verification email has been sent')
      // return res.status(200).send(`http://localhost:3000/emailverificationpage/${accessToken}`);
      // } else {
      //     console.log("error");
      //     return res.status(500).send("Internal server error");
      // }
    } catch (e) {
      console.log(e)
      return res.status(500).send('Internal server error')
    }
  },
}
