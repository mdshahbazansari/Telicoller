import mongoose from "mongoose"

export interface CallingInterface extends Document {
  customer: mongoose.Types.ObjectId
  status: 'calling' | 'busy' | 'switched off' | 'not received' | 'colled'
  notes: string
  followup?: Date
  startAt: Date
  createdAt: Date
  updatedAt: Date
}

