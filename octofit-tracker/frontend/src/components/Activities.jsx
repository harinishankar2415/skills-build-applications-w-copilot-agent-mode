import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

const normalizeResponse = (payload) =>
  Array.isArray(payload)
    ? payload
    : payload?.data ?? payload?.results ?? []

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/`)
        const payload = await response.json()
        setActivities(normalizeResponse(payload))
      } catch (err) {
        setError('Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      <p>Backend endpoint: <code>{API_BASE_URL}/api/activities/</code></p>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !activities.length && <p>No activities found.</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id ?? activity.id ?? `${activity.type}-${activity.durationMinutes}`}>
            <strong>{activity.type}</strong>
            <div className="meta">
              User: {activity.user?.name ?? activity.user ?? 'Unknown'}
            </div>
            <div className="meta">
              Team: {activity.team?.name ?? activity.team ?? 'None'}
            </div>
            <div className="meta">
              Duration: {activity.durationMinutes} min · Calories: {activity.caloriesBurned}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
