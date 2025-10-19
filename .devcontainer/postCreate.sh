#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Running post-create setup..."

if [ -f .gitmodules ]; then
    echo "� Syncing & initializing submodules"
    git submodule sync --recursive || true
    git submodule update --init --recursive || true
else
    echo "ℹ️  No .gitmodules found (skipping submodule init)"
fi

echo "📦 Installing workspace packages (tokens/devtools)"
npm --prefix packages/tokens install || true
npm --prefix packages/devtools install || true

echo "📦 Installing dashboard dependencies"
if [ -d "apps/dashboard" ]; then
    npm --prefix apps/dashboard ci || npm --prefix apps/dashboard install || true
else
    echo "⚠️  apps/dashboard not found"
fi

echo "✨ Post-create setup complete!"
echo "🎯 Next: npm --prefix apps/dashboard run dev"
