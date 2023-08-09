/** @file 내 유저 정보 조회 API */

import { Request, Response } from 'express'
import User from '../Models/User'

const path = '/user/me'
const method = 'get'
const handler = async (req: Request, res: Response): Promise<Response> => {
  const user = await User.findOne({ _id: req.session._id })
  return res.json(user)
}

export { path, method, handler }
