#!/bin/bash
set +e  # Don't fail on errors

echo "🚀 Running post-create setup..."

# Function to add submodule with branch tracking
add_submodule() {
    local repo_url=$1
    local repo_name=$2
    local branch=${3:-main}
    
    echo "📦 Attempting to add submodule: $repo_name"
    
    if git submodule add -b "$branch" "$repo_url" 2>/dev/null; then
        echo "✅ Successfully added $repo_name"
        # Configure branch tracking in .gitmodules
        git config -f .gitmodules "submodule.$repo_name.branch" "$branch"
    else
        echo "⚠️  Could not add $repo_name (may already exist or require authentication)"
    fi
}

# Add the three submodules (best effort - won't fail container if they can't be added)
add_submodule "https://github.com/Nymfarious/ddrummer-rhythm-studio.git" "ddrummer-rhythm-studio" "main"
add_submodule "https://github.com/Nymfarious/drum-hub.git" "drum-hub" "main"
add_submodule "https://github.com/Nymfarious/Drummer-to-Midi-Pipeline.git" "Drummer-to-Midi-Pipeline" "main"

# Install dashboard dependencies
echo "📦 Installing dashboard dependencies..."
if [ -d "apps/dashboard" ]; then
    cd apps/dashboard
    if npm install; then
        echo "✅ Dashboard dependencies installed"
    else
        echo "⚠️  Failed to install dashboard dependencies"
    fi
    cd ../..
else
    echo "⚠️  apps/dashboard directory not found"
fi

echo "✨ Post-create setup complete!"
echo "🎯 Run 'npm run dev' to start the dashboard"
