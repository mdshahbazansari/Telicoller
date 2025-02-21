import { Request, Response } from 'express'
import CallingModel from './callingModel'
import CustomerModel from '../customer.ts/customerModel'

export const CreateCalls = async (req: Request, res: Response) => {
  try {
    const call = new CallingModel(req.body)
    await call.save()

    res.status(200).json({ message: 'calling', call })
    return
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const FetchCalls = async (req: Request, res: Response) => {
  try {
    const calls = await CallingModel.find()
      .populate('customer', 'fullname email mobile') // 🟢 Fetch customer data
      .sort({ createdAt: -1 })

    if (!calls || calls.length === 0) {
      res.status(404).json({ message: 'Call-logs not found' })
      return
    }

    res.status(200).json(calls)
    return
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const FetchCallsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ message: 'Customer ID is required' })
      return
    }

    const callLogs = await CallingModel.find({ customer: id })
      .populate('customer', 'name email mobile')
      .sort({ createdAt: -1 })

    if (!callLogs || callLogs.length === 0) {
      res.status(404).json({ message: 'No call logs found for this customer' })
      return
    }

    res.status(200).json(callLogs)
    return
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const UpdateCalls = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { notes, status } = req.body

    if (!id) {
      res.status(400).json({ message: 'Customer ID is required' })
      return
    }

    const customer = await CustomerModel.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (!customer) {
      res.status(404).json({ message: 'Customer not found' })
      return
    }

    await CallingModel.updateMany(
      { customer: id },
      { notes, status },
      { new: true }
    )

    res
      .status(200)
      .json({ message: 'Customer and call logs updated successfully' })
    return
  } catch (err: any) {
    res.status(500).json({ message: err.message })
    return
  }
}

export const DeleteCalls = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const call = await CallingModel.findByIdAndDelete(id)

    if (!call) res.status(404).json({ message: 'Call-Log not found' })

    res.status(200).json({ message: 'Call disconneted', call })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}
