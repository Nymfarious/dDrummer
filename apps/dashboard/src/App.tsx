import { useEffect, useState } from 'react'
import apps from './apps.json'
import { resolveBaseUrl } from './utils/resolveBaseUrl'
import './App.css'
import { useState } from 'react'

type AppInfo = { name: string; desc: string; baseUrl: string; healthPath: string }
type Status = 'green' | 'yellow' | 'red' | 'orange'

async function getStatus(app: AppInfo): Promise<Status> {
  try {
    const r = await fetch(`${resolveBaseUrl(app.baseUrl)}${app.healthPath}`, { cache: 'no-store' })
    if (!r.ok) return 'orange'
    const j = await r.json()
    return j && j.ok ? 'green' : 'yellow'
  } catch {
    return 'red'
  }
}

export default function App() {
  const [statuses, setStatuses] = useState<Record<string, Status>>({})

  useEffect(() => {
    ;(async () => {
      const entries = await Promise.all(
        apps.map(async (a: AppInfo) => [a.name, await getStatus(a)] as const)
      )
      setStatuses(Object.fromEntries(entries))
    })()
  }, [])

  return (
    <div className="main">
      <div className="tools-grid">
        {apps.map((app: AppInfo) => {
          const s = statuses[app.name] || ('red' as Status)
          const dotColor = s === 'green' ? '#22c55e' : s === 'yellow' ? '#f59e0b' : s === 'orange' ? '#f97316' : '#ef4444'
          const href = resolveBaseUrl(app.baseUrl)
          return (
            <div key={app.name} className="tool-card card-gold">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '.25rem' }}>
                <span
                  style={{ height: 12, width: 12, borderRadius: 9999, background: dotColor, display: 'inline-block' }}
                  title={`Status: ${s}`}
                />
                <h3 className="tool-name" style={{ margin: 0 }}>{app.name}</h3>
              </div>
              <p className="tool-description">{app.desc}</p>

              <div className="tool-actions">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
function App() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-8 text-center bg-gradient-to-br from-primary to-purple-700 text-white">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          🥁 dDrummer Devtools Dashboard
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Your command center for dDrummer development tools
        </p>
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tools.map((tool) => (
            <div
              key={tool.repo}
              className="bg-card border border-border rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary"
            >
              <h2 className="text-2xl font-semibold mb-3 text-card-foreground">
                {tool.name}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed min-h-[3rem]">
                {tool.description}
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={`https://github.com/${tool.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-md text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition-colors"
                >
                  Run
                </a>
                <button
                  className="btn btn-secondary"
                  onClick={() => openInRunner(href)}
                <a
                  href={tool.codespacesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-md text-sm font-medium bg-gradient-to-br from-primary to-purple-700 text-primary-foreground hover:scale-105 hover:shadow-lg transition-all"
                >
                  Run in panel
                </button>
              </div>
            </div>
          )
        })}
      </div>
          ))}
        </div>
      </main>

      <footer className="p-6 text-center bg-card border-t border-border text-muted-foreground text-sm">
        <p>Built with React + TypeScript + Vite + Tailwind CSS</p>
      </footer>
    </div>
  )
}

function openInRunner(url: string) {
  const runnerUrl = `/runner?u=${encodeURIComponent(url)}`
  window.location.assign(runnerUrl)
}
