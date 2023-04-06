import User from '../Models/User.js'
import Transaction from '../Models/Transaction.js'

export const userTransction = {
  controller: async (req, res) => {
    try {
      const findTracnsaction = await Transaction.findall({ buyerid: req.params.id })

      if (!findTracnsaction) return res.status(200).send('No Transaction found')
      else return res.status(200).json(findTracnsaction)
    } catch (e) {
      console.log(e)
      return res.status(500).send('Server side error!')
    }
  },
}
