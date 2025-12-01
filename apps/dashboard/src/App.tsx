// apps/dashboard/src/App.tsx
import React, { useEffect, useState } from "react";
import apps from "./apps.json";
import metrics from "./data/metrics.json";
import "./index.css";
import { resolveBaseUrl } from "./lib/resolveBaseUrl";

type Status = "green" | "yellow" | "red" | "orange";

type AppInfo = {
  name: string;
  desc: string;
  baseUrl: string;
  healthPath?: string; // default /health.json
};

async function getStatus(app: AppInfo): Promise<Status> {
  const health = app.healthPath ?? "/health.json";
  try {
    const r = await fetch(`${resolveBaseUrl(app.baseUrl)}${health}`, { cache: "no-store" });
    if (!r.ok) return "orange";
    const j = await r.json();
    return j && j.ok ? "green" : "yellow";
  } catch {
    return "red";
  }
}

function openInRunner(url: string) {
  const runnerUrl = `/runner?u=${encodeURIComponent(url)}`;
  window.location.assign(runnerUrl);
}

export default function App(): JSX.Element {
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

  useEffect(() => {
    (async () => {
      const entries = await Promise.all(
        (apps as AppInfo[]).map(async (a) => [a.name, await getStatus(a)] as const)
      );
      setStatuses(Object.fromEntries(entries));
    })();
  }, []);

  return (
    <main className="min-h-dvh p-6 text-[hsl(var(--foreground))] bg-[hsl(var(--background))]">
      {/* Header / Hero */}
      <header className="app-hero mb-6">
        <h1 className="text-3xl font-bold">Echoverse Control Panel</h1>
        <p className="text-sm text-muted-foreground">Launch local apps and quick metrics</p>
      </header>

      {/* Metrics strip */}
      <section className="metrics-grid mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card card-gold p-4">
          <div className="text-sm text-muted-foreground">Active Projects</div>
          <div className="text-2xl font-semibold">{(metrics as any).active}</div>
        </div>
        <div className="card card-gold p-4">
          <div className="text-sm text-muted-foreground">Total Commits</div>
          <div className="text-2xl font-semibold">{(metrics as any).commits}</div>
        </div>
        <div className="card card-gold p-4">
          <div className="text-sm text-muted-foreground">Last Activity</div>
          <div className="text-2xl font-semibold">{(metrics as any).lastActivity}</div>
        </div>
        <div className="card card-gold p-4">
          <div className="text-sm text-muted-foreground">Performance</div>
          <div className="text-2xl font-semibold">{(metrics as any).perf}%</div>
        </div>
      </section>

      {/* App cards */}
      <section className="apps-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(apps as AppInfo[]).map((app) => {
          const s: Status = statuses[app.name] || "red";
          const dotColor =
            s === "green" ? "#22c55e" :
            s === "yellow" ? "#f59e0b" :
            s === "orange" ? "#f97316" :
            "#ef4444";

          const href = resolveBaseUrl(app.baseUrl);

          return (
            <div key={app.name} className="card-gold p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 9999,
                      backgroundColor: dotColor,
                      display: "inline-block",
                    }}
                    title={`Status: ${s}`}
                    aria-label={`Status ${s}`}
                  />
                  <h3 className="text-lg font-semibold m-0">{app.name}</h3>
                </div>
                <p className="opacity-80 text-sm">{app.desc}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold focus-gold"
                  role="button"
                >
                  Run
                </a>
                <button  
                  className="btn-secondary"  
                  onClick={() => openInRunner(href)}  
                >  
                  Run in panel  
                </button>  
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
