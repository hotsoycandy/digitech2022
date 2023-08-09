import express from 'express'
import multer from 'multer'
import session from 'express-session'
import {
  path as signupPath,
  method as signupMethod,
  handler as signupHandler
} from './routes/signup'
import {
  path as getUsersPath,
  method as getUsersMethod,
  handler as getUsersHandler
} from './routes/getUserMe'
import {
  path as loginPath,
  method as loginMethod,
  handler as loginHandler
} from './routes/login'

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
  app[signupMethod](signupPath, (req, res, next) => {
    signupHandler(req, res)
      .then(() => {
        next()
      })
      .catch(err => {
        next(err)
      })
  })
  app[getUsersMethod](getUsersPath, (req, res, next) => {
    getUsersHandler(req, res)
      .then(() => {
        next()
      })
      .catch(err => {
        next(err)
      })
  })
  app[loginMethod](loginPath, (req, res, next) => {
    loginHandler(req, res)
      .then(() => {
        next()
      })
      .catch(err => {
        next(err)
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
