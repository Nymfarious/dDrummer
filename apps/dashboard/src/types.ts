export type TrafficLight = "green" | "yellow" | "orange" | "red";

export type AppInfo = {
  name: string;
  baseUrl: string; // e.g., https://hd.yourdomain.app
  desc: string;
};

export type HealthResponse = {
  ok: boolean;
  revision?: string;
  deployedAt?: string;
};

export type AppStatus = {
  status: TrafficLight;
  ok: boolean;
  revision?: string;
  deployedAt?: string;
  error?: string;
};
