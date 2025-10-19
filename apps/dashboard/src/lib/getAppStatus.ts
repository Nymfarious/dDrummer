import type { AppStatus, HealthResponse } from "../types";

export async function getAppStatus(url: string): Promise<AppStatus> {
  const endpoint = url.replace(/\/+$/, "") + "/api/health";
  try {
    const r = await fetch(endpoint, { cache: "no-store" });
    if (!r.ok) {
      return { status: "red", ok: false, error: `HTTP ${r.status}` };
    }
    const json = (await r.json()) as HealthResponse;
    const ok = !!json.ok;
    return {
      status: ok ? "green" : "red",
      ok,
      revision: json.revision,
      deployedAt: json.deployedAt
    };
  } catch (e: any) {
    return { status: "orange", ok: false, error: e?.message ?? "network" };
  }
}
