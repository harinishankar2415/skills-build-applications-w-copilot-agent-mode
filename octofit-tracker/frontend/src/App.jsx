import { NavLink, Routes, Route } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function Home() {
  return (
    <section>
      <h1>Octofit Tracker</h1>
      <p>
        This React frontend connects to the backend using an environment-aware API
        URL.
      </p>
      <p>
        In Codespaces, set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code>.
      </p>
      <p>
        The frontend uses the safe fallback <code>{API_BASE_URL}</code> when the
        environment variable is unset.
      </p>
      <div className="home-links">
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Octofit Tracker</h1>
        <nav>
          <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
            Users
          </NavLink>
          <NavLink to="/teams" className={({ isActive }) => (isActive ? 'active' : '')}>
            Teams
          </NavLink>
          <NavLink to="/activities" className={({ isActive }) => (isActive ? 'active' : '')}>
            Activities
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Leaderboard
          </NavLink>
          <NavLink to="/workouts" className={({ isActive }) => (isActive ? 'active' : '')}>
            Workouts
          </NavLink>
        </nav>
        <div className="api-note">
          API base URL: <code>{API_BASE_URL}</code>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
