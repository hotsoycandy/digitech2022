/** @file 기존 글 수정 API */

import { Request, Response } from 'express'
import Post from '../../Models/Post'
import * as validate from '../../validate'

const path = '/posts/:postId'
const method = 'put' // patch
const handler = async (req: Request, res: Response): Promise<Response> => {
  if (req.session._id === undefined) {
    return res.status(401).json({
      errorCode: 'Unauthorized',
      errorMessage: '로그인이 되어 있지 않습니다.'
    })
  }

  const { title, content } = req.body

  if (title !== undefined && !validate.checkString(title)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"title" 문제가 있습니다.'
    })
  }

  if (content !== undefined && !validate.checkString(content)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '"content" 문제가 있습니다.'
    })
  }

  const updatePostParams: { title?: string, content?: string } = {}
  if (title !== undefined) {
    updatePostParams.title = title
  }
  if (content !== undefined) {
    updatePostParams.content = content
  }

  const { postId } = req.params
  const post = await Post.findOneAndUpdate(
    { _id: postId, authorId: req.session._id },
    { $set: updatePostParams },
    { new: true }
  )

  if (post === null) {
    return res.status(404).json({
      errorCode: 'ResourceNotFound',
      errorMessage: '해당 포스트를 찾을 수 없습니다.'
    })
  }

  return res.json(post)
}

export { path, method, handler }
