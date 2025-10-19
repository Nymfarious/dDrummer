# Base Node devcontainer
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# System tools you want available in every codespace
USER root
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends git-lfs \
  && git lfs install \
  && rm -rf /var/lib/apt/lists/*

# Switch back to the default non-root user from base image
USER node
WORKDIR /workspaces/dDrummer
