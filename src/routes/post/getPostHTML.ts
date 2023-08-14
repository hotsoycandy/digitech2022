/** @file 포스트 HTML 조회 API */

import { Request, Response } from 'express'
import Post from '../../Models/Post'

const path = '/posts/:postId/html'
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

  const { title, content, viewCount, createAt, updateAt } = post

  return res.send(`<!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      .wrap { margin: 0 auto; display: table; }
      .title {
        margin: 20px 0 10px;
      }
      .content {
        width: 300px;
        min-height: 150px;
        border: 1px solid black;
        display: table;
        padding: 5px;
        word-break: break-all;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h2 class="title">${title}</h2>
      <div class="content">${content}</div>
      <div class="date-wrap">
        <div class="view-count">조회수: ${viewCount}</div>
        <div>작성일: ${createAt.toLocaleString()}</div>
        <div>수정일: ${updateAt.toLocaleString()}</div>
      </div>
    </div>
  </body>
  </html>`)
}

export { path, method, handler }
