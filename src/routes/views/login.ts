/** @file 수정 페이지 HTML 조회 API */

import { Request, Response } from 'express'

const path = '/login'
const method = 'get'
const handler = async (req: Request, res: Response): Promise<void> => {
  const { message = '' } = req.query
  return res.render('login', { message })
}

export { path, method, handler }
