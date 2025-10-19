import clsx from "clsx";
import type { AppInfo, AppStatus } from "../types";

function StatusDot({ status }: { status: AppStatus["status"] }) {
  const color =
    status === "green"
      ? "bg-green-500"
      : status === "yellow"
      ? "bg-yellow-400"
      : status === "orange"
      ? "bg-orange-500"
      : "bg-red-500";
  return <span className={clsx("inline-block h-2.5 w-2.5 rounded-full", color)} />;
}

export function AppCard({ app, status }: { app: AppInfo; status: AppStatus }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{app.name}</h3>
        <StatusDot status={status.status} />
      </div>
      <p className="text-sm opacity-80 mb-3">{app.desc}</p>
      <div className="text-xs opacity-70 space-y-1">
        <div>OK: {String(status.ok)}</div>
        {status.revision && <div>rev: {status.revision}</div>}
        {status.deployedAt && <div>deployed: {status.deployedAt}</div>}
        {status.error && <div className="text-orange-400">error: {status.error}</div>}
      </div>
      <a
        className="inline-block mt-3 text-blue-400 underline underline-offset-4"
        href={app.baseUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open
      </a>
    </div>
  );
}
