/** @file 기존 글 삭제 controller */

import { Request, Response } from 'express'
import Post from '../../Models/Post'

const path = '/posts-controller/:postId'
const method = 'delete'
const handler = async (req: Request, res: Response): Promise<void> => {
  if (req.session._id === undefined) {
    return res.redirect('/login?message=로그인이 되어있지 않습니다.')
  }

  const { postId } = req.params
  await Post.deleteOne({
    _id: postId,
    authorId: req.session._id
  })

  return res.redirect('/')
}

export { path, method, handler }
