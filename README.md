# dDrummer Grand‑daddy DevTools

This repo hosts the Devtools Dashboard and central tooling to seed/standardize sibling apps (submodules): Rhythm Studio, Drum Hub, Drummer‑to‑MIDI Pipeline.

## What’s here
- Dashboard (apps/dashboard): simple grid that can grow into status/control center
- Submodules recorded in `.gitmodules`
- Shared tokens (packages/tokens) with Tailwind preset
- Devtools CLI (packages/devtools) to apply presets into any app without destructive overwrites
- Health JSON template for apps (`apps/_template/scripts/create-health.mjs`)

## Running the dashboard
```bash
npm --prefix apps/dashboard install
npm --prefix apps/dashboard run dev
```
Forwarded port: 5173

## Seeding a child app with the UI preset
```bash
# Dry run
node packages/devtools/bin/gddev.mjs apply --target apps/ddrummer-rhythm-studio --features ui --dry-run

# Apply
node packages/devtools/bin/gddev.mjs apply --target apps/ddrummer-rhythm-studio --features ui
npm --prefix apps/ddrummer-rhythm-studio install
```
Note: because sibling apps are submodules, commit changes inside each submodule repo.

## ToDos (live)
- Root workspace config — DONE
- Shared tokens package — DONE
- Health generator template — DONE (template only)
- CI to build dashboard — DONE
- Dashboard status helpers — DONE (non-invasive add)
- Add gddev CLI — IN PROGRESS
- Wire dashboard Tailwind preset — TODO
- Add api‑health feature to CLI — TODO
- Add dashboard UI to trigger gddev — TODO

## Purpose
Centralize standards and accelerators:
- One-click “seed” of common UI/tools in any app
- Shared design tokens (colors, spacing, shadows)
- Optional health/status pings (static JSON at build)
- Future: auth wiring, lint/format presets, UI kit, library feature scaffolds

# dDrummer

dDrummer umbrella/host repository - For drummers

## Overview

This repository serves as the host/umbrella project for the dDrummer ecosystem. It provides:
- A **Devtools Dashboard** for easy access to all dDrummer tools
- **GitHub Codespaces** integration for quick development setup
- **Automatic submodule management** for related repositories

## Quick Start with GitHub Codespaces

1. Click the **Code** button on GitHub
2. Select **Codespaces** tab
3. Click **Create codespace on main** (or your branch)
4. Wait for the container to build and initialize
5. The dashboard will automatically start on port 5173

The Codespaces container will automatically:
- Add the following repositories as submodules (if accessible):
  - `ddrummer-rhythm-studio`
  - `drum-hub`
  - `Drummer-to-Midi-Pipeline`
- Install dashboard dependencies
- Configure git submodule branch tracking

## Local Development

### Prerequisites
- Node.js 20 or later
- npm

### Setup

```bash
# Install dependencies
npm install --prefix apps/dashboard

# Start the dashboard dev server
npm run dev
```

The dashboard will be available at http://localhost:5173

### Available Commands

- `npm run dev` - Start the dashboard in development mode
- `npm run build` - Build the dashboard for production
- `npm run preview` - Preview the production build

## Project Structure

```
dDrummer/
├── apps/
│   └── dashboard/        # Vite + React devtools dashboard
├── .devcontainer/        # Codespaces configuration
├── ddrummer-rhythm-studio/  # Submodule (auto-added in Codespaces)
├── drum-hub/            # Submodule (auto-added in Codespaces)
├── Drummer-to-Midi-Pipeline/  # Submodule (auto-added in Codespaces)
└── README.md
```

## Submodules

The repository includes three submodules that are automatically added when opening in Codespaces:

1. **Rhythm Studio** - Tool for creating drum patterns
2. **Drum Hub** - Central hub for drum resources
3. **Drummer-to-Midi Pipeline** - Convert drum performances to MIDI

If you're working locally, you can manually add submodules:

```bash
git submodule add https://github.com/Nymfarious/ddrummer-rhythm-studio.git
git submodule add https://github.com/Nymfarious/drum-hub.git
git submodule add https://github.com/Nymfarious/Drummer-to-Midi-Pipeline.git
git submodule update --init --recursive
```

## Dashboard Features

The Devtools Dashboard provides quick access to:
- Repository links for each tool
- "Open in Codespaces" buttons for instant development environments
- Tool descriptions and status

## Contributing

Each tool has its own repository. Navigate to the specific tool's submodule directory to contribute to that project.

