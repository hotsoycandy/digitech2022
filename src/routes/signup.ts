/** @file 회원가입 API 정보 파일 */

import { Request, Response } from 'express'
import User from '../Models/User'
import * as validate from '../validate'
import { encryptPassword } from '../utils/encryptPassword'

const path = '/signup'
const method = 'post'
const handler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    name,
    age,
    gender,
    id,
    password,
    phoneNumber,
    email,
    friendsNumber,
    inflowPath,
    houseAddress
  } = req.body

  if (!validate.checkString(name, [2, 20])) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"name" 문제가 있습니다.'
    })
  }

  if (!validate.checkNumber(age)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"age" 문제가 있습니다.'
    })
  }

  if (!validate.checkString(gender)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"gender" 문제가 있습니다.'
    })
  }

  if (!validate.checkId(id)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"id" 문제가 있습니다.'
    })
  }

  if (!validate.checkPassword(password)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"password" 문제가 있습니다.'
    })
  }

  if (!validate.checkPhoneNumber(phoneNumber)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"phoneNumber" 문제가 있습니다.'
    })
  }

  if (!validate.checkEmail(email)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"email" 문제가 있습니다.'
    })
  }

  if (!validate.checkNumber(friendsNumber)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"friendsNumber" 문제가 있습니다.'
    })
  }

  if (!validate.checkString(inflowPath, [1, 500])) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"inflowPath" 문제가 있습니다.'
    })
  }

  if (!validate.checkString(houseAddress, [1, 500])) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"houseAddress" 문제가 있습니다.'
    })
  }

  const encryptedPassword = encryptPassword(password, id)

  const user = await User.create({
    name,
    age,
    gender,
    id,
    password: encryptedPassword,
    phoneNumber,
    email,
    friendsNumber,
    inflowPath,
    houseAddress
  })

  return res.status(200).json(user)
}

export { path, method, handler }
