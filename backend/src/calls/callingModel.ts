import mongoose, { model, Schema } from 'mongoose'
import { CallingInterface } from './callingInterface'

const callingModel = new Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    status: {
      type: String,
      enum: [
        'calling',
        'waiting',
        'switched off',
        'not received',
        'not reachable',
        'called',
      ],
      default: 'calling',
    },
    notes: {
      type: String,
      required: true,
    },
    followup: {
      type: Date,
    },
    startAt: {
      type: Date,
      default: () => new Date(),
    },
    endAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { timestamps: true }
)

callingModel.pre<CallingInterface>('save', function (next) {
  this.startAt = new Date()
  next()
})

const CallingModel = model('Call', callingModel)
export default CallingModel
