import { Schema, model, Document, Types } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId
  team?: Types.ObjectId
  totalDuration: number
  totalCalories: number
  activityCount: number
  rank: number
  createdAt: Date
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  totalDuration: { type: Number, required: true, min: 0 },
  totalCalories: { type: Number, required: true, min: 0 },
  activityCount: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
  createdAt: { type: Date, default: () => new Date() }
})

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema)
