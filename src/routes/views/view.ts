/** @file 메인 페이지 HTML 조회 API */

import { Request, Response } from 'express'
import Post from '../../Models/Post'
// import * as validate from '../../validate'

const path = '/views/:postId'
const method = 'get'
const handler = async (req: Request, res: Response): Promise<void> => {
  const { params: { postId }, query: { origin_page: originPage = '1' } } = req

  if (postId.length !== 24) {
    return res.redirect('/')
  }

  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { viewCount: 1 } },
    { new: true })

  if (post === null) {
    return res.redirect('/')
  }

  return res.render('view', { post, originPage })
}

export { path, method, handler }
