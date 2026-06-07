import { Schema, model, Document, Types } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  team?: Types.ObjectId
  createdAt: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  createdAt: { type: Date, default: () => new Date() }
})

export default model<IUser>('User', userSchema)
