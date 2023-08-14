/** @file 포스트 조회 API */

import { Request, Response } from 'express'
import Post from '../../Models/Post'

const path = '/posts/:postId'
const method = 'get'
const handler = async (req: Request, res: Response): Promise<Response> => {
  const { postId } = req.params
  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { viewCount: 1 } },
    { new: true })
  if (post === null) {
    return res.status(404).json({
      errorCode: 'ResourceNotFound',
      errorMessage: '해당 포스트를 찾을 수 없습니다.'
    })
  }
  return res.json(post)
}

export { path, method, handler }
