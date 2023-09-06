/** @file 기존 글 수정 controller */

import { Request, Response } from 'express'
import Post from '../../Models/Post'
import * as validate from '../../validate'

const path = '/posts-controller/:postId'
const method = 'put' // patch
const handler = async (req: Request, res: Response): Promise<void> => {
  if (req.session._id === undefined) {
    return res.redirect('/login?message=로그인이 되어있지 않습니다.')
  }

  const { postId } = req.params
  const { title, content } = req.body

  if (title !== undefined && !validate.checkString(title)) {
    return res.redirect(`/posts/${postId}/edit?message=제목에 문제가 있습니다.`)
  }

  if (content !== undefined && !validate.checkString(content)) {
    return res.redirect(`/posts/${postId}/edit?message=내용에 문제가 있습니다.`)
  }

  const updatePostParams: { title?: string, content?: string } = {}
  if (title !== undefined) {
    updatePostParams.title = title
  }
  if (content !== undefined) {
    updatePostParams.content = content
  }

  await Post.updateOne(
    { _id: postId, authorId: req.session._id },
    { $set: updatePostParams }
  )

  return res.redirect(`/posts/${postId}/view`)
}

export { path, method, handler }
