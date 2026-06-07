import { Router } from 'express'
import User from '../models/User'

const router = Router()

router.get('/', async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean()
  res.json(users)
})

router.post('/', async (req, res) => {
  const { name, email, team } = req.body
  const user = new User({ name, email, team })
  await user.save()
  res.status(201).json(user)
})

export default router
