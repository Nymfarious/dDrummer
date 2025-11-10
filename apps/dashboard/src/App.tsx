import { useEffect, useState } from 'react'
import apps from './apps.json'
import './App.css'

type AppInfo = { name: string; desc: string; baseUrl: string; healthPath: string }
type Status = 'green' | 'yellow' | 'red' | 'orange'

function resolveBaseUrl(baseUrl: string): string {
  try {
    const u = new URL(baseUrl)
    const host = window.location.hostname
    const protocol = window.location.protocol
    const isLocal = u.hostname === 'localhost' || u.hostname === '127.0.0.1'
    if (host.endsWith('.app.github.dev') && isLocal) {
      const port = u.port || (u.protocol === 'https:' ? '443' : '80')
      const parts = host.split('.')
      const sub = parts[0]
      const newSub = sub.replace(/-\d+$/, `-${port}`)
      const targetHost = [newSub, ...parts.slice(1)].join('.')
      return `${protocol}//${targetHost}${u.pathname}${u.search}${u.hash}`
    }
    return baseUrl
  } catch {
    return baseUrl
  }
}

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
                >
                  Run
                </a>
                <button
                  className="btn btn-secondary"
                  onClick={() => openInRunner(href)}
                >
                  Run in panel
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function openInRunner(url: string) {
  const runnerUrl = `/runner?u=${encodeURIComponent(url)}`
  window.location.assign(runnerUrl)
}
