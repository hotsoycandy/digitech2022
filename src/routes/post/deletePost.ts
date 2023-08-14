/** @file 기존 글 삭제 API */

import { Request, Response } from 'express'
import Post from '../../Models/Post'

const path = '/posts/:postId'
const method = 'delete'
const handler = async (req: Request, res: Response): Promise<Response> => {
  if (req.session._id === undefined) {
    return res.status(401).json({
      errorCode: 'Unauthorized',
      errorMessage: '로그인이 되어 있지 않습니다.'
    })
  }

  const { postId } = req.params
  const post = await Post.findOneAndDelete({
    _id: postId,
    authorId: req.session._id
  })

  if (post === null) {
    return res.status(404).json({
      errorCode: 'ResourceNotFound',
      errorMessage: '해당 포스트를 찾을 수 없습니다.'
    })
  }

  return res.json(post)
}

export { path, method, handler }
