import { Request, Response } from 'express'
import CustomerModel from './customerModel'
import readXlsxFile from 'read-excel-file/node'

export const CreateCustomer = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const isCustomer = await CustomerModel.findOne({ email })

    if (isCustomer) {
      throw new Error('Already have an Customer || customer exist')
    }

    const customer = new CustomerModel(req.body)
    await customer.save()

    res.status(200).json(customer)
    return
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const FetchCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await CustomerModel.find().sort({ createdAt: -1 })
    if (!customer) {
      res.json({ message: 'Something is error | check database' })
      return
    }
    res.status(200).json(customer)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}
export const FetchCustomerLogs = async (req: Request, res: Response) => {
  try {
    const customer = await CustomerModel.find().sort({ createdAt: -1 })
    if (!customer) {
      res.json({ message: 'Something is error | check database' })
      return
    }
    res.status(200).json(customer)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const FetchCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const customer = await CustomerModel.findById(id)

    if (!customer) {
      res.status(404).json({ message: 'Customer not found' })
      return
    }

    res.status(200).json(customer)
    return
    return
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const UpdateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const customer = await CustomerModel.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (!customer) {
      res.status(404).json({ message: 'Customer not found' })
      return
    }

    res.status(200).json(customer)
    return
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const DeleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const customer = await CustomerModel.findByIdAndDelete(id)

    if (!customer) {
      res.status(404).json({ message: 'Customer not found' })
      return
    }

    res.status(200).json({ message: 'Customer deleted successfully' })
    return
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const readExcel = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const filePath = req.file.path
    const rows = await readXlsxFile(filePath)
    const headers = rows.shift()

    const customers = rows.map((row) => ({
      fullname: row[0],
      email: row[1],
      mobile: row[2],
    }))

    const savedCustomers = await CustomerModel.insertMany(customers)

    res
      .status(200)
      .json({ message: 'Data saved successfully', data: savedCustomers })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}
