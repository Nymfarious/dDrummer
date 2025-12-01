/**
 * Resolves a base URL for the current environment.
 * Handles GitHub Codespaces port forwarding by transforming localhost URLs.
 */
export function resolveBaseUrl(baseUrl: string): string {
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

/**
 * Validates that a URL is allowed for embedding in an iframe.
 * Only allows absolute URLs pointing to localhost, 127.0.0.1, same-origin, or GitHub Codespaces.
 */
export function isAllowedUrl(urlString: string): boolean {
  try {
    // Only allow absolute URLs - reject relative URLs
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      return false
    }
    const url = new URL(urlString)
    // Allow localhost and 127.0.0.1
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return true
    }
    // Allow same origin
    if (url.origin === window.location.origin) {
      return true
    }
    // Allow GitHub Codespaces URLs
    if (url.hostname.endsWith('.app.github.dev')) {
      return true
    }
    return false
  } catch {
    return false
  }
}
