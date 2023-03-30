import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRouter from './Routes/AuthRouter.js'
import InquiryRouter from './Routes/InquiryRouter.js'
import CouponRouter from './Routes/CouponRouter.js'
import UserRouter from './Routes/UserRouter.js'
import PaymentRouter from './Routes/PaymentRouter.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: `${process.env.CLIENT_URL}`,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  }),
)

const port = process.env.PORT || 5000

// ! apis
app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/coupon', CouponRouter)
app.use('/api/inquiry', InquiryRouter)
// app.use("/api/trace",);
app.use('/api/payment', PaymentRouter)

// ! to remove mongoose strictQuery error
mongoose.set('strictQuery', false)

// ! database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Successfully connected to database.'))
  .catch((err) => console.log('Databse connection problem.   ' + err))

// ! to run server on particular port
app.listen(port, () => {
  console.log(`Server is Listening on PORT ${port}`)
})
