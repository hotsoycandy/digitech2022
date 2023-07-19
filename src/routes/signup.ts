/** @file 회원가입 API 정보 파일 */

import { Request, Response } from 'express'

const path = '/signup'
const method = 'put'
const handler = (req: Request, res: Response): Response => {
  return res.send('Hello, World!')
}

export { path, method, handler }
