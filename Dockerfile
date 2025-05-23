# Stage 1: Base setup
FROM node:lts-alpine AS base

# Set environment for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install curl and pnpm via corepack
RUN apk add --no-cache curl && \
    corepack enable && \
    corepack prepare pnpm@9.15.4 --activate

# Set working directory
WORKDIR /app

# Copy root config files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy only package.json files for caching layer
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json

# Install all dependencies (will be cached if package.jsons haven't changed)
RUN pnpm install


# Now copy the full source code
COPY apps ./apps
COPY turbo.json tsconfig.json ./
COPY packages ./packages


# Expose frontend (3000) and backend (3001)
EXPOSE 3000 3001

# Default command to run both frontend and backend servers
CMD ["pnpm", "start"]
