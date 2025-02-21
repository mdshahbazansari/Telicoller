import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import userRouter from './user/userRoutes'
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log('Database connected 😍')
  })
  .catch(() => {
    console.log('Connection failed 😫!')
  })

import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import customerRouter from './customer.ts/customerRoutes'
import callingRouter from './calls/callingRoutes'

const app = express()
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server run on PORT : ${PORT} 👈🏻`)
})

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Lets start Now')
})

//API's
app.use('/api/user', userRouter)
app.use('/api/customers', customerRouter)
app.use('/api/call-logs', callingRouter)
