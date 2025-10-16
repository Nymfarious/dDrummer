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

