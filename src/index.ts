import { connectDB } from './db'
import { startServer } from './server'

async function main (): Promise<void> {
  await connectDB()
  await startServer()
  console.log('Applicaiton is ready!')
}

main().catch(console.error)
