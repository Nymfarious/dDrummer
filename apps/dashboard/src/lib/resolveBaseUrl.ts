export function resolveBaseUrl(baseUrl: string): string {
  try {
    const u = new URL(baseUrl);
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    const isLocal = u.hostname === 'localhost' || u.hostname === '127.0.0.1';

    // GitHub Codespaces port-subdomain rewriting
    if (host.endsWith('.app.github.dev') && isLocal) {
      const port = u.port || (u.protocol === 'https:' ? '443' : '80');
      const parts = host.split('.');
      const sub = parts[0];
      const newSub = sub.replace(/-\d+$/, `-${port}`);
      const targetHost = [newSub, ...parts.slice(1)].join('.');
      return `${protocol}//${targetHost}${u.pathname}${u.search}${u.hash}`;
    }
    return baseUrl;
  } catch {
    return baseUrl;
  }
}
