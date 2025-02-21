import { Router } from 'express'
import {
  CreateCustomer,
  DeleteCustomer,
  FetchCustomer,
  FetchCustomerById,
  readExcel,
  UpdateCustomer,
} from './customerController'
import multer from 'multer'
const customerRouter = Router()

const upload = multer({ dest: 'uploads/' })

customerRouter.post('/', CreateCustomer)
customerRouter.get('/', FetchCustomer)
customerRouter.get('/:id', FetchCustomerById)
customerRouter.put('/:id', UpdateCustomer)
customerRouter.delete('/:id', DeleteCustomer)
customerRouter.post('/read-file', upload.single('file'), readExcel)

export default customerRouter
