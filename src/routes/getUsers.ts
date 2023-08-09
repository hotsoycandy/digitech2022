/** @file 유저 정보 목록 조회 API */

import { Request, Response } from 'express'
import User from '../Models/User'

const path = '/users'
const method = 'get'
const handler = (req: Request, res: Response): void => {
  User.find()
    .then((userList) => {
      return res.json(userList)
    })
    .catch(err => {
      console.error(err)
    })
}

export { path, method, handler }
