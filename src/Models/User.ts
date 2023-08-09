import { Schema, model } from 'mongoose'

interface User {
  name: string
  age: number
  gender: string
  id: string
  password: string
  phoneNumber: string
  email: string
  friendsNumber: number
  inflowPath?: string
  houseAddress?: string
  createAt: Date
  updateAt: Date
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  id: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  friendsNumber: { type: Number, required: true },
  inflowPath: { type: String },
  houseAddress: { type: String }
}, {
  versionKey: false,
  // timestamps: true
  timestamps: {
    createdAt: 'createAt',
    updatedAt: 'updateAt'
  }
})

export default model('User', userSchema)
