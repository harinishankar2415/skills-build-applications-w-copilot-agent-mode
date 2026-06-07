import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const PORT = Number(process.env.PORT || 8000)
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`

const app = express()

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (origin.includes('localhost') || origin.endsWith('.app.github.dev')) {
        return callback(null, true)
      }
      callback(new Error('CORS policy does not allow this origin'))
    },
    credentials: true
  })
)
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl: baseUrl })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

async function start() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB:', MONGO_URL)
    console.log('API base URL:', baseUrl)

    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
