import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const normalizeResponse = (payload) =>
  Array.isArray(payload)
    ? payload
    : payload?.data ?? payload?.results ?? []

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/users/`)
        const payload = await response.json()
        setUsers(normalizeResponse(payload))
      } catch (err) {
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <p>Backend endpoint: <code>{API_BASE_URL}/users/</code></p>
      {loading && <p>Loading users…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !users.length && <p>No users found.</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id ?? user.id ?? `${user.email}-${user.name}`}>
            <strong>{user.name}</strong> — {user.email}
            <div className="meta">
              Team: {user.team?.name ?? user.team ?? 'Unassigned'}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Users
