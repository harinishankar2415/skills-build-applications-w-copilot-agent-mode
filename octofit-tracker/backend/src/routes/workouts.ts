import { Router } from 'express'
import Workout from '../models/Workout'

const router = Router()

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 }).lean()
  res.json(workouts)
})

router.post('/', async (req, res) => {
  const { title, description, category, difficulty, durationMinutes } = req.body
  const workout = new Workout({ title, description, category, difficulty, durationMinutes })
  await workout.save()
  res.status(201).json(workout)
})

export default router
