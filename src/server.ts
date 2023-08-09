import express from 'express'
import multer from 'multer'
import {
  path as signupPath,
  method as signupMethod,
  handler as signupHandler
} from './routes/signup'
import {
  path as getUsersPath,
  method as getUsersMethod,
  handler as getUsersHandler
} from './routes/getUsers'

export async function startServer (): Promise<void> {
  const app = express()
  const upload = multer({ dest: 'static/' })

  // server middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(upload.fields([{ name: 'ooo' }]))
  app.use('/static', express.static('static'))

  // api handlers
  app[signupMethod](signupPath, signupHandler)
  app[getUsersMethod](getUsersPath, getUsersHandler)

  const port = 3000
  await new Promise((resolve) => {
    app.listen(port, (): void => {
      resolve(null)
    })
  })
  console.log('Server is ready!')
}
