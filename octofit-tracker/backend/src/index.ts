import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ status: 'ok' })
})

async function start() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB')
    app.listen(Number(PORT), () => {
      console.log(`Backend listening on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
