import mongoose, { model, Schema } from 'mongoose'

const customerModel = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    fullname: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const CustomerModel = model('Customer', customerModel)
export default CustomerModel
