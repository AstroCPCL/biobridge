import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Activity, Thermometer, Droplets, FlaskConical, Sun, RefreshCw, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import Landing from './Landing'

const API_URL = import.meta.env.VITE_API_URL || ''
const REFRESH_INTERVAL = parseInt(import.meta.env.VITE_REFRESH_INTERVAL_MS) || 5000

// Metric configuration
const METRICS = {
  temperature: { icon: Thermometer, color: '#ef4444', unit: '°C', label: 'Temperature' },
  humidity: { icon: Droplets, color: '#3b82f6', unit: '%', label: 'Humidity' },
  ph: { icon: FlaskConical, color: '#a855f7', unit: 'pH', label: 'pH Level' },
  dissolved_oxygen: { icon: Activity, color: '#22c55e', unit: 'mg/L', label: 'Dissolved O₂' },
  light_level: { icon: Sun, color: '#eab308', unit: 'lux', label: 'Light' },
}

function App() {
  const [currentView, setCurrentView] = useState('landing') // 'landing' or 'dashboard'
  const [status, setStatus] = useState(null)
  const [measurements, setMeasurements] = useState([])
  const [latestValues, setLatestValues] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  // Fetch system status
  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/status`)
      if (!res.ok) throw new Error('Failed to fetch status')
      const data = await res.json()
      setStatus(data)
    } catch (err) {
      console.error('Status fetch error:', err)
    }
  }

  // Fetch recent measurements
  const fetchMeasurements = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/measurements?page_size=100`)
      if (!res.ok) throw new Error('Failed to fetch measurements')
      const data = await res.json()

      // Process data for charts
      const grouped = {}
      const latest = {}

      data.items.forEach(m => {
        const time = new Date(m.timestamp).toLocaleTimeString()
        if (!grouped[time]) grouped[time] = { time }
        grouped[time][m.metric_name] = m.value

        // Track latest value per metric
        if (!latest[m.metric_name] || new Date(m.timestamp) > new Date(latest[m.metric_name].timestamp)) {
          latest[m.metric_name] = m
        }
      })

      setMeasurements(Object.values(grouped).reverse())
      setLatestValues(latest)
      setLastUpdate(new Date())
      setError(null)
    } catch (err) {
      console.error('Measurements fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and interval (only when on dashboard)
  useEffect(() => {
    if (currentView === 'dashboard') {
      fetchStatus()
      fetchMeasurements()

      const interval = setInterval(() => {
        fetchStatus()
        fetchMeasurements()
      }, REFRESH_INTERVAL)

      return () => clearInterval(interval)
    }
  }, [currentView])

  // Manual refresh
  const handleRefresh = () => {
    setLoading(true)
    fetchStatus()
    fetchMeasurements()
  }

  // Show landing page
  if (currentView === 'landing') {
    return <Landing onNavigateToDashboard={() => setCurrentView('dashboard')} />
  }

  // Show dashboard
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Landing
          </button>

          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">BioBridge Dashboard</h1>
            <p className="text-slate-400 text-sm">
              {status ? `Mode: ${status.mode}` : 'Loading...'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            {status?.database_connected ? (
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm text-slate-400">
              {lastUpdate ? `Updated: ${lastUpdate.toLocaleTimeString()}` : ''}
            </span>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </header>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span>Error: {error}</span>
        </div>
      )}

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {Object.entries(METRICS).map(([key, config]) => {
          const value = latestValues[key]
          const Icon = config.icon

          return (
            <div
              key={key}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5" style={{ color: config.color }} />
                <span className="text-slate-400 text-sm">{config.label}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: config.color }}>
                {value ? `${value.value.toFixed(1)}` : '--'}
                <span className="text-sm text-slate-500 ml-1">{config.unit}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature & Humidity */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4">Temperature & Humidity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={measurements}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis yAxisId="temp" stroke="#ef4444" fontSize={12} />
              <YAxis yAxisId="hum" orientation="right" stroke="#3b82f6" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
              />
              <Legend />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Temperature (°C)"
              />
              <Line
                yAxisId="hum"
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Humidity (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* pH & Dissolved Oxygen */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4">pH & Dissolved Oxygen</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={measurements}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis yAxisId="ph" stroke="#a855f7" fontSize={12} domain={[4, 10]} />
              <YAxis yAxisId="do" orientation="right" stroke="#22c55e" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
              />
              <Legend />
              <Line
                yAxisId="ph"
                type="monotone"
                dataKey="ph"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
                name="pH Level"
              />
              <Line
                yAxisId="do"
                type="monotone"
                dataKey="dissolved_oxygen"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name="DO (mg/L)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Light Level */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Light Level</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={measurements}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#eab308" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
              />
              <Line
                type="monotone"
                dataKey="light_level"
                stroke="#eab308"
                strokeWidth={2}
                dot={false}
                name="Light (lux)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer stats */}
      <footer className="mt-8 pt-6 border-t border-slate-700">
        <div className="flex flex-wrap gap-6 text-sm text-slate-400">
          {status && (
            <>
              <span>Active Sources: {status.active_sources}</span>
              <span>Total Measurements: {status.total_measurements?.toLocaleString()}</span>
              <span>Database: {status.database_connected ? 'Connected' : 'Disconnected'}</span>
            </>
          )}
        </div>
      </footer>
    </div>
  )
}

export default App
