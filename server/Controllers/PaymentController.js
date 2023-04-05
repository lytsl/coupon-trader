import Coupon from '../Models/Coupon.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = Stripe(process.env.STRIPE_KEY)

// !make payment
export const makePayment = {
  controller: async (req, res) => {
    const customer = await stripe.customers.create({
      metadata: {
        userid: req.currUser._id,
        couponid: req.body.couponid,
        // email: req.currUser.email,
      },
    })

    const findCoupon = await Coupon.findById(req.body.couponid)
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
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-fail`,
    })

    res.send({ url: session.url, couponid: req.body.couponid })
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
