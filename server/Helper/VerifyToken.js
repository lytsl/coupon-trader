import JWT from 'jsonwebtoken'
import User from '../Models/User.js'

const VerifyToken = async (req, res, next) => {
  try {
    // const token = req.cookies.coupontrader;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // console.log('In token verification')
    if (token) {
      const verified = await JWT.verify(token, process.env.JWT_SEC_KEY)

      const currUser = await User.findOne({
        _id: verified.id,
      })

      if (!currUser) {
        return res.status(401).send('Unauthorized User')
      }

      req.token = token
      let { password, ...rest } = currUser._doc

      req.currUser = rest
      req.userId = currUser._id

      next()
    } else {
      return res.status(401).send('Please login to perform this')
    }
  } catch (e) {
    res.status(401).send('Unauthorized user')
  }
}

export default VerifyToken
