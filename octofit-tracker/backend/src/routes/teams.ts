import { Router } from 'express'
import Team from '../models/Team'

const router = Router()

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').sort({ createdAt: -1 }).lean()
  res.json(teams)
})

router.post('/', async (req, res) => {
  const { name, description, members } = req.body
  const team = new Team({ name, description, members: members || [] })
  await team.save()
  res.status(201).json(team)
})

export default router
