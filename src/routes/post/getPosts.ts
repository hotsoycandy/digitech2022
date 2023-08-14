/** @file 포스트 목록 조회 API */

import { Request, Response } from 'express'
import Post from '../../Models/Post'
import * as validate from '../../validate'

const path = '/posts'
const method = 'get'
const handler = async (req: Request, res: Response): Promise<Response> => {
  const { page: pageString = '1', limit: limitString = '5' } = req.query

  if (!validate.checkString(pageString)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"page" 문제가 있습니다.'
    })
  }
  if (!validate.checkString(limitString)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"limit" 문제가 있습니다.'
    })
  }

  const page = parseInt(pageString)
  const limit = parseInt(limitString)

  const postList = await Post.find()
    .skip((page - 1) * limit)
    .limit(limit)
  return res.json(postList)
}

export { path, method, handler }
