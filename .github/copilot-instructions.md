# Copilot Instructions for dDrummer

This repository is the umbrella/host project for the dDrummer ecosystem, providing a Devtools Dashboard for drummers.

## Project Overview

- **Stack**: Vite + React 18 + TypeScript + Tailwind CSS v4
- **Package Manager**: npm
- **Node.js Version**: 20 or later
- **Main Application**: Dashboard located in `apps/dashboard/`

## Project Structure

```
dDrummer/
├── apps/
│   └── dashboard/        # Vite + React devtools dashboard
├── .devcontainer/        # GitHub Codespaces configuration
└── .github/              # GitHub configuration and Copilot instructions
```

## Build and Development Commands

Run all commands from the repository root:

```bash
# Install dashboard dependencies (only the dashboard has dependencies)
npm install --prefix apps/dashboard

# Start development server (runs on port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Note: The root package.json defines scripts that proxy to the dashboard app using `--prefix apps/dashboard`.

## Code Style and Conventions

- Use TypeScript for all new code
- Use functional React components with hooks
- Follow Tailwind CSS utility-first approach for styling
- Use ES modules (`type: "module"` in package.json)
- Keep components focused and single-purpose

## Testing

When adding tests, follow existing patterns in the repository. Use the testing framework already configured in the project.

## Git Workflow

- Create feature branches for new work
- Write clear, descriptive commit messages
- Reference issue numbers in commits when applicable

## Important Notes

- The dashboard automatically starts on port 5173
- This repository uses git submodules for related tools (rhythm-studio, drum-hub, etc.)
- Do not modify files in submodule directories directly; changes to submodules should be made in their respective repositories
- Never commit secrets or environment files (.env, .env.local)
