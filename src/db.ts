import mongoose from 'mongoose'

const password = 'HitXxnO2dR1fouTW'
const rawConnectString = 'mongodb+srv://wkdwnsghd617:<password>@cluster0.u1c48p6.mongodb.net/?retryWrites=true&w=majority'

const connectString = rawConnectString.replace('<password>', password)

async function connectDB (): Promise<void> {
  await mongoose.connect(connectString)
  console.log('Mongo Atlas is ready!')
}

export { connectDB }
