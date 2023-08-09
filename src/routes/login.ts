/** @file 로그인 API */

import { Request, Response } from 'express'
import User from '../Models/User'
import { encryptPassword } from '../utils/encryptPassword'

const path = '/login'
const method = 'post'
const handler = async (req: Request, res: Response): Promise<Response> => {
  const { id, password: originalPassword } = req.body

  const user = await User.findOne({
    id,
    password: encryptPassword(originalPassword, id)
  })

  if (user === null) {
    return res.status(400).json({ login: false })
  }

  req.session._id = user._id.toString()
  return res.json({ login: true })
}

export { path, method, handler }
