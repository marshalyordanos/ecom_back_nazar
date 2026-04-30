#!/usr/bin/env bash
# Backend redeploy: pull main → Prisma generate & migrate → build → PM2 restart.
# Run from anywhere: bash redeploy.sh  (when cwd is not the repo: bash /path/to/ecom_back/redeploy.sh)
#
# Requires: git, Node, prisma CLI, pm2; DATABASE_URL set for migrate when needed.

set -euo pipefail

# Default PM2 id/name; override: PM2_RESTART_TARGET=my-app ./redeploy.sh
PM2_RESTART_TARGET="${PM2_RESTART_TARGET:-2}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> git pull origin main"
git pull origin main

echo "==> npx prisma generate"
npx prisma generate

echo "==> npx prisma migrate deploy"
npx prisma migrate deploy

echo "==> npm run build"
npm run build

echo "==> pm2 restart ${PM2_RESTART_TARGET}"
pm2 restart "${PM2_RESTART_TARGET}"

echo "==> Done."
