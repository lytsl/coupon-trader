import Inquiry from '../Models/Inquiry.js'

// !get all inquiry
export const getInquiry = {
  controller: async (req, res) => {
    try {
      const inquiry = await Inquiry.find()

      return res.status(200).send(inquiry)
    } catch (e) {
      return res.status(500).send('Error Occure')
    }
  },
}

// !add new inquiry
export const addInquiry = {
  validator: async (req, res, next) => {
    const { title, description } = req.body
    if (!title || !description) {
      return res.status(400).send('Please fill all the fields')
    }

    next()
  },
  controller: async (req, res) => {
    const { title, description } = req.body
    const { _id: userid, username, avatar } = req.currUser

    try {
      const newInquiry = await Inquiry.create({
        username,
        userid,
        avatar,
        title,
        description,
      })

      await newInquiry.save()

      return res.status(200).send('Successfully added new inquiry')
    } catch (e) {
      return res.status(401).send('New inquiry not added')
    }
  },
}
