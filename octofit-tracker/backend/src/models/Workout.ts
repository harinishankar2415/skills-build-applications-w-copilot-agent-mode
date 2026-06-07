import { Schema, model, Document } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  description?: string
  category: string
  difficulty: string
  durationMinutes: number
  createdAt: Date
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: () => new Date() }
})

export default model<IWorkout>('Workout', workoutSchema)
