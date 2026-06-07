import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const normalizeResponse = (payload) =>
  Array.isArray(payload)
    ? payload
    : payload?.data ?? payload?.results ?? []

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${API_BASE_URL}/leaderboard/`)
        const payload = await response.json()
        setEntries(normalizeResponse(payload))
      } catch (err) {
        setError('Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Backend endpoint: <code>{API_BASE_URL}/leaderboard/</code></p>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !entries.length && <p>No leaderboard entries found.</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id ?? entry.user?.id ?? `${entry.rank}-${entry.totalDuration}`}>
            <strong>Rank {entry.rank}</strong>
            <div className="meta">User: {entry.user?.name ?? entry.user ?? 'Unknown'}</div>
            <div className="meta">Team: {entry.team?.name ?? entry.team ?? 'None'}</div>
            <div className="meta">
              Duration: {entry.totalDuration} min · Calories: {entry.totalCalories}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
