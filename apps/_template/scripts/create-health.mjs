/**
 * Place a copy of this file at apps/<app>/scripts/create-health.mjs
 * Add to that app's package.json scripts: "prebuild": "node scripts/create-health.mjs"
 * Requires a "public" directory (Vite/SPA).
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'public', 'api');
mkdirSync(outDir, { recursive: true });

const payload = {
  ok: true,
  revision: process.env.GITHUB_SHA ?? 'local',
  deployedAt: process.env.DEPLOYED_AT ?? new Date().toISOString()
};

writeFileSync(join(outDir, 'health.json'), JSON.stringify(payload, null, 2));
console.log('Wrote public/api/health.json:', payload);
