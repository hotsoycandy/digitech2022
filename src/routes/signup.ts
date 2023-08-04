/** @file 회원가입 API 정보 파일 */

import { Request, Response } from 'express'
import User from '../Models/User'

const path = '/signup'
const method = 'post'
const handler = (req: Request, res: Response): Response => {
  console.log(1)
  User.create({
    name: '권기범',
    age: 26,
    gender: '아파치 헬리콥터',
    id: 'kill_kimgjungun',
    password: 'qwer1234',
    phoneNumber: '010-1234-5678',
    email: 'kill_kimgjungun@sdh.hs.kr',
    friendsNumber: 5,
    inflowPath: '북한',
    houseAddress: '평양시'
  }).then(() => {
    console.log('create success')
  }).catch(err => {
    console.error(err)
  })
  return res.send('Hello, World!')
}

export { path, method, handler }
