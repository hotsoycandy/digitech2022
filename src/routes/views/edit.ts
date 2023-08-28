/** @file 수정 페이지 HTML 조회 API */

import { Request, Response } from 'express'
import Post from '../../Models/Post'
// import * as validate from '../../validate'

const path = '/posts/:postId/edit'
const method = 'get'
const handler = async (req: Request, res: Response): Promise<void> => {
  const { params: { postId } } = req

  if (postId.length !== 24) {
    return res.redirect('/')
  }

  const post = await Post.findOne({ _id: postId })

  if (post === null) {
    return res.redirect('/')
  }

  return res.render('edit', { post })
}

export { path, method, handler }
