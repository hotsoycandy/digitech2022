/** @file 로그아웃 API */

import { Request, Response } from 'express'

const path = '/logout'
const method = 'post'
const handler = async (req: Request, res: Response): Promise<void> => {
  delete req.session._id
  return res.redirect('/')
}

export { path, method, handler }
