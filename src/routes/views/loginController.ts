/** @file 로그인 controller */

import { Request, Response } from 'express'
import User from '../../Models/User'
import { encryptPassword } from '../../utils/encryptPassword'

const path = '/login-controller'
const method = 'post'
const handler = async (req: Request, res: Response): Promise<void> => {
  const { id, password: originalPassword } = req.body

  const user = await User.findOne({
    id,
    password: encryptPassword(originalPassword, id)
  })

  if (user === null) {
    return res.redirect('/login?message=아이디와 비밀번호가 일치하지 않습니다.')
  }

  req.session._id = user._id.toString()
  return res.redirect('/')
}

export { path, method, handler }
