import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

const normalizeResponse = (payload) =>
  Array.isArray(payload)
    ? payload
    : payload?.data ?? payload?.results ?? []

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/teams/`)
        const payload = await response.json()
        setTeams(normalizeResponse(payload))
      } catch (err) {
        setError('Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      <p>Backend endpoint: <code>{API_BASE_URL}/api/teams/</code></p>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !teams.length && <p>No teams found.</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id ?? team.id ?? team.name}>
            <strong>{team.name}</strong>
            <div>{team.description || 'No description'}</div>
            <div className="meta">Members: {team.members?.length ?? 0}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
