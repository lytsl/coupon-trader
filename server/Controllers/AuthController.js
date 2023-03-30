import User from '../Models/User.js'
import bycrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// !create mail
const sendMail = async (mailContent, mailSubject, user) => {
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
    to: user.email,
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

// !register
export const register = {
  validator: async (req, res, next) => {
    const { username, email, password, cpassword } = req.body

    if (!username || !email || !password || !cpassword) {
      return res.status(400).send('Please fill all the fields')
    }
    if (username.indexOf(' ') >= 0) {
      return res.status(400).send('Username should not contain any space')
    }
    if (username.length < 3) {
      return res.status(400).send('Username must be greater than 3 characters')
    }
    if (password.length < 8) {
      return res.status(400).send('Password must be at least 8 characters')
    }
    if (password !== cpassword) {
      return res
        .status(400)
        .send('Password and confirm password field must be same')
    }
    next()
  },
  controller: async (req, res) => {
    const { username, email, password } = req.body
    try {
      const newUser = await User.create({
        username,
        email,
        password,
      })

      await newUser.save()

      let other = {
        username,
        email,
      }

      return res.status(200).send({
        message: 'Account Creation Successful',
        other,
      })
    } catch (e) {
      console.log(e)
      if (e.keyValue?.username) {
        return res.status(409).send('Username already exists')
      } else if (e.keyValue?.email) {
        return res.status(409).send('Email already exists')
      } else {
        return res.status(500).send('Registration failed')
      }
    }
  },
}

// !login
export const login = {
  validator: async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send('Please fill all the fields')
    }
    next()
  },
  controller: async (req, res) => {
    try {
      const findUser = await User.findOne({
        username: req.body.username,
      })

      if (!findUser) {
        return res.status(401).send('Invalid credintials find')
      }

      const isMatch = await bycrypt.compare(
        req.body.password,
        findUser.password,
      )

      if (!isMatch) {
        return res.status(401).send('Invalid credintials pass')
      }
      // !create token
      const accessToken = JWT.sign(
        {
          id: findUser._id,
        },
        process.env.JWT_SEC_KEY,
        { expiresIn: '3d' },
      )

      // ! creater cookie
      res.cookie('coupontrader', accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
      })

      const { password, ...others } = findUser._doc

      return res.status(201).json({
        success: true,
        ...others,
        accessToken,
      })
    } catch (e) {
      return res.status(500).send('Login failed internal server error')
    }
  },
}

// !sendEmailVerification
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

      const mailContent = `Hi ${req.currUser.username} \nclick the below URL to verify your email address. \nhttp://localhost:3000/emailverificationpage/${accessToken} \nIf you will not start the verification process now, than this link will expire in 24hours.`

      console.log('Email verification')

      const mailSubject = 'Coupon Trader Email verification'

      const emailSentRes = await sendMail(
        mailContent,
        mailSubject,
        req.currUser,
      )

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

// !verify email
export const verifyEmail = {
  controller: async (req, res) => {
    console.log('in verifyEmail')
    console.log(req.query.verify_email_token)
    if (!req.query.verify_email_token) {
      return res.status(400).send('Invalid Account verification URL')
    }

    try {
      const verified = JWT.verify(
        req.query.verify_email_token,
        process.env.JWT_SEC_KEY,
      )
      const findUser = await User.findOne({
        _id: verified.id,
      })

      if (!findUser) {
        return res.status(400).send('User not found for email verification')
      }

      await User.findByIdAndUpdate(findUser._id, {
        emailverified: true,
      })

      res.status(201).send('Email verification successful')
    } catch (e) {
      console.log(e)
      return res.status(400).send('Account verification failed')
    }
  },
}

// !send reset email
export const sendResetEmail = {
  validator: async (req, res, next) => {
    if (!req.body.email) {
      return res.status(400).send('Please Enter a Email Address')
    }
    next()
  },
  controller: async (req, res, next) => {
    try {
      const findUser = await User.findOne({ email: req.body.email })

      if (!findUser) {
        return res
          .status(404)
          .send('User not found associated to this email id')
      }

      const accessToken = JWT.sign(
        {
          id: findUser._id,
        },
        process.env.JWT_SEC_KEY,
        { expiresIn: 60 * 5 },
      )

      const mailContent = `Hi ${findUser.username}, \nAs You have Requested for reset password instructions, here they are, please click the URL or Copy the URL and Paste in your Browser \nhttp://localhost:3000/changepassword/${accessToken}`

      const mailSubject = 'Coupon Trader Password Reset'

      const emailSentRes = await sendMail(mailContent, mailSubject, findUser)

      // if (emailSwntRes)
      return res.status(200).send('Password reset email has been sent')
      // else
      //     return res.status(500).send("Internal Server Error Mail");
    } catch (e) {
      res.status(500).send('Internal Server Error')
    }
  },
}

// !reset token verify
export const resetTokenVerify = {
  controller: async (req, res) => {
    if (!req.query.reset_password_token) {
      return res.status(400).send('Invalid Password Reset URL')
    }

    try {
      const verified = JWT.verify(
        req.query.reset_password_token,
        process.env.JWT_SEC_KEY,
      )

      const findUser = await User.findOne({
        _id: verified.id,
      })

      if (!findUser) {
        return res.status(400).send('User Not Found For Password Reset')
      }

      return res.status(201).json({
        token: req.query.reset_password_token,
      })
    } catch (e) {
      return res.status(400).send('Invalid Password Reset URL')
    }
  },
}

// !reset password
export const resetPassword = {
  validator: async (req, res, next) => {
    if (!req.body.resetPassword || !req.body.retypePassword) {
      return res.status(400).send('Please Fill all the Fields')
    } else if (req.body.resetPassword !== req.body.retypePassword) {
      return res.status(400).send('Both field value must be same')
    }
    next()
  },
  controller: async (req, res) => {
    try {
      const verified = JWT.verify(req.body.token, process.env.JWT_SEC_KEY)

      if (!verified) {
        return res.status(401).send('Unauthenticated User')
      }

      const findUser = await User.findOne({
        _id: verified.id,
      })

      if (!findUser) {
        return res.status(401).json('User not found for password reset')
      }

      const bcryptPass = await bcrypt.hash(req.body.resetPassword, 12)

      const updateUser = await User.findByIdAndUpdate(
        verified.id,
        {
          // password: CryptoJS.AES.encrypt(req.body.resetPassword, process.env.AES_SEC_KEY).toString()
          password: bcryptPass,
        },
        { new: true },
      )

      console.log(updateUser)
      return res.status(200).send('Password Reset Successful')
    } catch (e) {
      // console.log(e)
      return res.status(500).send('Password Reset Failed')
    }
  },
}
