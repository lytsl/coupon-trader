import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    transactionid: {
      type: String,
      required: true,
    },
    couponid: {
      type: String,
      required: true,
    },
    sellerid: {
      type: String,
      required: true,
    },
    buyerid: {
      type: String,
      required: true,
    },
    dateoftransaction: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentstatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const Transaction = mongoose.model('Transaction', TransactionSchema)

export default Transaction
