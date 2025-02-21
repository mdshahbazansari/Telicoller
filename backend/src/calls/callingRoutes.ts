import { Router } from 'express'
import {
  CreateCalls,
  DeleteCalls,
  FetchCalls,
  FetchCallsById,
  UpdateCalls,
} from './callingController'

const callingRouter = Router()

callingRouter.post('/', CreateCalls)
callingRouter.get('/', FetchCalls)
callingRouter.get('/:id', FetchCallsById)
callingRouter.put('/:id', UpdateCalls)
callingRouter.delete('/:id', DeleteCalls)

export default callingRouter
