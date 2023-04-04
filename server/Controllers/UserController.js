import User from '../Models/User.js'
import Coupon from '../Models/Coupon.js'
import bcrypt from 'bcryptjs'

// !update user
export const updateUser = {
  controller: async (req, res) => {
    const userID = req.currUser._id.toString()
    console.log(userID)
    if (!req.body.username || !req.body.email) {
      return res.status(400).json('Please Fill all the fields')
    }

    if (
      !req.body.password &&
      !req.body.newPassword &&
      !req.body.rePassword &&
      req.body.username &&
      req.body.email
    ) {
      try {
        // FIXME: user not found
        const findUser = await User.findOne({ _id: userID })
        if (!findUser) {
          return res.status(401).send('User Not Found')
        } else {
          let emailverified = true
          if (req.body.email !== findUser.email) emailverified = false

          const updateUser = await User.findByIdAndUpdate(
            userID,
            {
              username: req.body.username,
              email: req.body.email,
              emailverified: emailverified,
            },
            { new: true },
          )

          const { password, ...others } = updateUser._doc

          return res.status(200).json({ ...others })
        }
      } catch (e) {
        console.log(e)
        return res.status(500).send('Updation Failed')
      }
    } else if (
      req.body.password &&
      req.body.newPassword &&
      req.body.rePassword &&
      req.body.username &&
      req.body.email
    ) {
      try {
        const findUser = await User.findOne({ email: req.body.email })

        if (!findUser) {
          return res.status(401).send('User Not Found')
        } else {
          let emailverified = true
          if (req.body.email !== findUser.email) emailverified = false
          // const decryptedPass = CryptoJS.AES.decrypt(
          //     findUser.password,
          //     process.env.AES_SEC_KEY
          // ).toString(CryptoJS.enc.Utf8);
          const decryptedPass = await bcrypt.compare(req.body.password, findUser.password)

          if (!decryptedPass) {
            return res.status(401).send('Incorrect Current Password')
          }

          if (req.body.newPassword === req.body.rePassword) {
            const bcryptPass = await bcrypt.hash(req.body.newPassword, 12)
            const updateUser = await User.findByIdAndUpdate(
              userID,
              {
                username: req.body.username,
                email: req.body.email,
                password: bcryptPass,
                emailverified: emailverified,
              },
              { new: true },
            )

            await updateUser.save()

            const { password, ...others } = updateUser._doc

            return res.status(200).json({ ...others })
          } else {
            return res.status(401).send('Password and re-Enter Password Must be Same')
          }
        }
      } catch (e) {
        return res.status(500).send('Internal server error')
      }
    } else {
      return res.status(401).send('Please Fill all the Fields')
    }
  },
}

//get current user
export const currentUser = {
  controller: async (req, res) => {
    try {
      const findUser = await User.findById(req.currUser._id)
      // console.log(req.currUser);
      res.status(201).json(findUser)
    } catch (e) {
      s
      res.status(500).json('Internal Server Error')
    }
  },
}

// !find user
export const findUser = {
  controller: async (req, res) => {
    try {
      const findUser = await User.findById(req.params.id)
      // console.log(req.currUser);
      res.status(201).json(findUser)
    } catch (e) {
      res.status(500).json('Internal Server Error')
    }
  },
}

// !find all user
export const findAllUsers = {
  controller: async (req, res) => {
    try {
      const page = req.query.page - 1 || 0
      const limit = req.query.limit || 100

      const currentUseridx = page * limit
      let allUsers = await User.find()
      let finalUsers = []
      allUsers.map((user) => {
        const { password, ...others } = user._doc
        finalUsers.push(others)
      })

      allUsers = finalUsers

      if (allUsers.length - 1 < currentUseridx)
        return res.status(401).send('more users not available')

      const currentPageUsers = allUsers.slice(currentUseridx, currentUseridx + limit)
      // console.log(currentPageUsers);

      res.status(200).send(currentPageUsers)
    } catch (e) {
      console.log(e)
      return res.status(400).send('Internal server error')
    }
  },
}

// !delete user
export const deleteUser = {
  validator: async (req, res, next) => {
    if (req.currUser._id.toString() !== req.params.id) {
      return res.status(400).send('You are not authenticated to delete this user')
    }
    next()
  },
  controller: async (req, res) => {
    try {
      // const findRenter = await Agreement.find({ renterid: req.params.id });

      // if (findRenter.length > 0) {
      //     return res.status(400).send("Your products are rented, cannot delete account");
      // }

      // const findBorrower = await Agreement.find({ borrowerid: req.params.id });

      // if (findBorrower.length > 0) {
      //     return res.status(400).send("You have borrowed products, cannot delete account");
      // }

      await Coupon.deleteMany({ sellerid: req.params.id })
      // await Review.deleteMany({ renterid: req.params.id });
      await User.findByIdAndDelete(req.params.id)

      return res.status(200).send('Account deletion Successfull')
    } catch (e) {
      console.log(e)
      return res.status(500).send('Account deletion Failed')
    }
  },
}

// !dashboard
export const dashboard = {
  controller: async (req, res) => {
    try {
      const coupon = await Coupon.find({
        $or: [{ sellerid: req.currUser._id }, { buyerid: req.currUser._id }],
      })
      console.log(coupon)

      let buyer = coupon.filter((prod) => prod.buyerid == req.currUser._id)
      let seller = coupon.filter((prod) => prod.sellerid == req.currUser._id)

      return res.send({
        buyer,
        seller,
      })
    } catch (e) {
      return res.status(500).send(e)
    }
  },
}
