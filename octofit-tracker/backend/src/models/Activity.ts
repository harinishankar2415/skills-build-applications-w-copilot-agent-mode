import { Schema, model, Document, Types } from 'mongoose'

export interface IActivity extends Document {
  user: Types.ObjectId
  team?: Types.ObjectId
  type: string
  durationMinutes: number
  caloriesBurned: number
  createdAt: Date
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 0 },
  caloriesBurned: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: () => new Date() }
})

export default model<IActivity>('Activity', activitySchema)
