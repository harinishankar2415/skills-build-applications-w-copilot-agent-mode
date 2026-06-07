import { Router } from 'express'
import Activity from '../models/Activity'

const router = Router()

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user team').sort({ createdAt: -1 }).lean()
  res.json(activities)
})

router.post('/', async (req, res) => {
  const { user, team, type, durationMinutes, caloriesBurned } = req.body
  const activity = new Activity({ user, team, type, durationMinutes, caloriesBurned })
  await activity.save()
  res.status(201).json(activity)
})

export default router
