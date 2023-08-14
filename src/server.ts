import express from 'express'
import multer from 'multer'
import session from 'express-session'
import * as signupAPI from './routes/signup'
import * as getUserMeAPI from './routes/getUserMe'
import * as loginAPI from './routes/login'
import * as createPostAPI from './routes/post/createPost'
import * as getPostsAPI from './routes/post/getPosts'
import * as getPostAPI from './routes/post/getPost'
import * as getPostHTMLAPI from './routes/post/getPostHTML'
import * as updatePostAPI from './routes/post/updatePost'
import * as deletePostAPI from './routes/post/deletePost'

interface Route {
  path: string
  method: 'post' | 'get' | 'put' | 'delete'
  handler: Function
}

const routes: Route[] = [
  signupAPI,
  getUserMeAPI,
  loginAPI,
  createPostAPI,
  getPostsAPI,
  getPostAPI,
  getPostHTMLAPI,
  updatePostAPI,
  deletePostAPI
]

declare module 'express-session' { // express-session 모듈 안에 있는 type을 수정하겠다.
  interface SessionData { // express-session 안에 있는 SessionData 값을 만지겠다.
    _id: string
  }
}

export async function startServer (): Promise<void> {
  const app = express()
  const upload = multer({ dest: 'static/' })

  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'cat keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }))

  // server middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(upload.fields([{ name: 'ooo' }]))
  app.use('/static', express.static('static'))

  // api handlers
  routes.forEach(({ path, method, handler }) => {
    // api handlers
    app[method](path, (req, res, next) => {
      handler(req, res)
        .then(() => {
          next()
        })
        .catch((err: any) => {
          next(err)
        })
    })
  })

  const port = 3000
  await new Promise((resolve) => {
    app.listen(port, (): void => {
      resolve(null)
    })
  })
  console.log('Server is ready!')
}
