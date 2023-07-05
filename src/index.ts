import express from 'express'
const app = express()

// interface User {
//   name: string
//   age: number
// }

// const db: User[] = []

// query, body

// http://localhost:3005/static/banana.gif
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
  const name = req.query.name
  let stringName = '이름 없음'

  if (typeof name === 'string') stringName = name
  if (Array.isArray(name)) {
    stringName = name.join(', ')
  }

  return res.send('this is get. you are ' + req.query.name)
})

app.post('/', (req, res) => {
  return res.send('this is post')
})

app.put('/', (req, res) => {
  return res.send('this is put')
})

app.delete('/', (req, res) => {
  return res.send('this is delete')
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
