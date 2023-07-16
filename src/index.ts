import express from 'express'
import multer from 'multer'
import fs from 'fs'

// HitXxnO2dR1fouTW

const app = express()
const upload = multer({ dest: 'static/' })

interface User {
  name: string
  age: number
}

const db: User[] = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(upload.fields([{ name: 'ooo' }]))
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
  return res.json(db)
})

app.post('/', (req, res) => {
  const name = req.body.name
  const age = req.body.age

  if (req.files === undefined) {
    return res.send('Error:"files"가 유효하지 않습니다.')
  }

  if (!Array.isArray(req.files)) {
    const { filename, originalname } = req.files.ooo[0]
    fs.renameSync(
      `./static/${filename}`,
      `./static/${originalname}`
    )
  }

  if (typeof name !== 'string') {
    return res.send('Error:"name"은 string이 아닙니다.')
  }
  if (typeof age !== 'string') {
    return res.send('Error:"age"은 유효한 값이 아닙니다.')
  }

  const numberAge = parseInt(age)

  if (Number.isNaN(numberAge)) {
    return res.send('Error:"age"은 유효한 값이 아닙니다.')
  }

  db.push({
    name,
    age: numberAge
  })

  return res.json(db)
})

app.post('/image-upload', (req, res) => {
  return res.send('image uploaded')
})

app.put('/:targetName', (req, res) => {
  const targetName = req.params.targetName
  const name = req.query.name
  const age = req.query.age

  if (typeof name !== 'string') {
    return res.send('Error:"name"은 string이 아닙니다.')
  }
  if (typeof age !== 'string') {
    return res.send('Error:"age"은 유효한 값이 아닙니다.')
  }

  const numberAge = parseInt(age)
  if (Number.isNaN(numberAge)) {
    return res.send('Error:"age"은 유효한 값이 아닙니다.')
  }

  const index = db.findIndex(user => user.name === targetName)
  if (db[index] === undefined) {
    return res.send('Error:존재하지 않는 이름입니다.')
  }

  db[index].name = name
  db[index].age = numberAge

  return res.json(db)
})

app.delete('/:targetName', (req, res) => {
  const targetName = req.params.targetName

  const index = db.findIndex(user => user.name === targetName)
  if (db[index] === undefined) {
    return res.send('Error:존재하지 않는 이름입니다.')
  }

  db.splice(index, 1)

  return res.json(db)
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
