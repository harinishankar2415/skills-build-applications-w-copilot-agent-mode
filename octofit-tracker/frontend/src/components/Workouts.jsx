import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

const normalizeResponse = (payload) =>
  Array.isArray(payload)
    ? payload
    : payload?.data ?? payload?.results ?? []

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts/`)
        const payload = await response.json()
        setWorkouts(normalizeResponse(payload))
      } catch (err) {
        setError('Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      <p>Backend endpoint: <code>{API_BASE_URL}/api/workouts/</code></p>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !workouts.length && <p>No workouts found.</p>}
      <ul>
        {workouts.map((item) => (
          <li key={item._id ?? item.title}>
            <strong>{item.title}</strong>
            <div>{item.description || 'No description provided.'}</div>
            <div className="meta">
              {item.category} · {item.difficulty} · {item.durationMinutes} min
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
X


