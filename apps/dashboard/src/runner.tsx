import React, { useMemo, useEffect, useState } from 'react';
import { resolveBaseUrl } from './lib/resolveBaseUrl';

function getTarget(): string {
  const raw = new URLSearchParams(window.location.search).get('u') || '';
  return resolveBaseUrl(raw);
}

export default function Runner(): JSX.Element {
  const src = useMemo(getTarget, []);
  const origin = useMemo(() => {
    try { return new URL(src).origin; } catch { return src; }
  }, [src]);

  // health color logic
  const [healthColor, setHealthColor] = useState<'green' | 'yellow' | 'orange' | 'red'>('red');

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(new URL('/health.json', src), { cache: 'no-store' });
        if (!r.ok) return setHealthColor('orange');
        const j = await r.json();
        setHealthColor(j?.ok ? 'green' : 'yellow');
      } catch {
        setHealthColor('red');
      }
    })();
  }, [src]);

  return (
    <div className="runner-root">
      <header className="runner-bar">
        <div className="runner-title">
          <strong>Runner</strong>
          <span
            className="runner-dot"
            style={{
              backgroundColor:
                healthColor === 'green'
                  ? '#22c55e'
                  : healthColor === 'yellow'
                  ? '#f59e0b'
                  : healthColor === 'orange'
                  ? '#f97316'
                  : '#ef4444',
            }}
          />
          <span className="runner-origin">{origin}</span>
        </div>

        <div className="runner-actions">
          <a
            className="btn-gold focus-gold"
            href={src}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in new tab
          </a>
          <button className="btn-secondary" onClick={() => location.reload()}>
            Reload
          </button>
          <button className="btn-secondary" onClick={() => history.back()}>
            Close
          </button>
        </div>
      </header>

      <iframe title="Module Runner" src={src} className="runner-frame" />
    </div>
  );
}

/* Inject minimal scoped CSS so it works standalone */
const style = document.createElement('style');
style.textContent = `
  html,body,#root{height:100%;margin:0}
  .runner-root{height:100%;display:flex;flex-direction:column;background:#0f0f10;color:#e8e8e8}
  .runner-bar{
    flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;
    gap:.75rem;padding:.6rem .8rem;border-bottom:1px solid #1e1e1e;
    background: rgba(20,20,20,.9);backdrop-filter: blur(3px) saturate(120%);
    box-shadow: 0 2px 20px rgba(217,150,21,.15);
  }
  .runner-title{display:flex;align-items:center;gap:.5rem}
  .runner-dot{width:.5rem;height:.5rem;border-radius:9999px;display:inline-block}
  .runner-origin{opacity:.8;font-size:.85rem}
  .runner-actions{display:flex;align-items:center;gap:.5rem}
  .runner-frame{flex:1 1 auto;border:0;width:100%;height:100%}
`;
document.head.appendChild(style);
