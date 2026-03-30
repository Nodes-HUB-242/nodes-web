#!/usr/bin/env bash

set -euo pipefail

APP_NAME="nodes-web"
APP_DIR="/var/www/nodes-web"
APP_PORT="3002"
BRANCH="${1:-main}"

echo "==> Deploy ${APP_NAME} on port ${APP_PORT}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is not installed"
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "node is not installed"
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed"
  exit 1
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "pm2 is not installed"
  exit 1
fi

if [ ! -d "${APP_DIR}" ]; then
  echo "Directory not found: ${APP_DIR}"
  exit 1
fi

cd "${APP_DIR}"

echo "==> Fetch latest code"
git fetch origin
git checkout "${BRANCH}"
git pull --ff-only origin "${BRANCH}"

echo "==> Install dependencies"
npm install

echo "==> Lint"
npm run lint

echo "==> Build"
npm run build

if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
  echo "==> Restart existing PM2 app"
  pm2 restart "${APP_NAME}"
else
  echo "==> Start new PM2 app"
  pm2 start npm --name "${APP_NAME}" -- start -- --port "${APP_PORT}"
fi

echo "==> Save PM2 process list"
pm2 save

echo "==> Deployment complete"
pm2 status "${APP_NAME}"
