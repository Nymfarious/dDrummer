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

export default function Runner() {
  const raw = new URLSearchParams(window.location.search).get('u') || ''
  const src = resolveBaseUrl(raw)
  return (
    <div className="h-dvh w-dvw p-2 bg-neutral-950">
      <iframe
        src={src}
        className="w-full h-full rounded-2xl border border-neutral-800"
        title="Module Runner"
      />
    </div>
  )
}
