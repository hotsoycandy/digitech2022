import express from 'express'
import methodOverride from 'method-override'
import multer from 'multer'
import session from 'express-session'

// APIs
import * as signupAPI from './routes/signup'
import * as getUserMeAPI from './routes/getUserMe'
import * as loginAPI from './routes/login'
import * as createPostAPI from './routes/post/createPost'
import * as getPostsAPI from './routes/post/getPosts'
import * as getPostAPI from './routes/post/getPost'
import * as getPostHTMLAPI from './routes/post/getPostHTML'
import * as updatePostAPI from './routes/post/updatePost'
import * as deletePostAPI from './routes/post/deletePost'

// pages
import * as mainPage from './routes/views/main'
import * as viewPage from './routes/views/view'
import * as editPage from './routes/views/edit'
import * as loginPage from './routes/views/login'
import * as logoutPage from './routes/views/logout'

import * as loginController from './routes/views/loginController'

// models
import User from './Models/User'

interface Route {
  path: string
  method: 'post' | 'get' | 'put' | 'delete'
  handler: Function
}

const routes: Route[] = [
  // APIs
  signupAPI,
  getUserMeAPI,
  loginAPI,
  createPostAPI,
  getPostsAPI,
  getPostAPI,
  getPostHTMLAPI,
  updatePostAPI,
  deletePostAPI,

  // pages
  mainPage,
  viewPage,
  editPage,
  loginPage,
  logoutPage,

  // controller
  loginController
]

declare module 'express-session' { // express-session 모듈 안에 있는 type을 수정하겠다.
  interface SessionData { // express-session 안에 있는 SessionData 값을 만지겠다.
    _id: string
  }
}

declare module 'express-serve-static-core' { // expres 모듈 안에 있는 type을 수정하겠다.
  interface Request { // express 안에 있는 Express 값을 만지겠다.
    renderData?: Record<string, any>
  }
}

export async function startServer (): Promise<void> {
  const app = express()
  const upload = multer({ dest: 'static/' })

  app.use(methodOverride('_method'))
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
  app.use('/static', express.static('./src/static'))

  // set view engine
  app.set('view engine', 'ejs')
  app.set('views', './src/views')

  app.use((req, res, next) => {
    if (req.session._id === undefined) return next()

    User.findOne({ _id: req.session._id })
      .then(user => {
        req.renderData ??= {}
        req.renderData.user = user
        next()
      })
      .catch(err => {
        next(err)
      })
  })

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
