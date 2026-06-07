import { Router } from 'express'
import Leaderboard from '../models/Leaderboard'

const router = Router()

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find()
    .sort({ rank: 1, totalDuration: -1 })
    .populate('user', 'name')
    .populate('team', 'name')
    .lean()

  res.json(leaderboard)
})

export default router
