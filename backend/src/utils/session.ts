import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const Session = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.cookies

    if (!accessToken) throw new Error('Unauthorize session !')

    const user = jwt.verify(accessToken, process.env.AUTH_SECRET as string)
    res.json(user)
  } catch (err: any) {
    res.status(500).json({ message: 'Session failed !' })
  }
}
