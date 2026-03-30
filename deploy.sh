#!/usr/bin/env bash

set -euo pipefail

APP_NAME="nodes-web"
APP_DIR="/var/www/nodes-web"
PM2_CONFIG="ecosystem.config.js"
BRANCH="${1:-main}"

echo "==> Deploy ${APP_NAME} with PM2 config ${PM2_CONFIG}"

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

if [ ! -f "${PM2_CONFIG}" ]; then
  echo "PM2 config not found: ${APP_DIR}/${PM2_CONFIG}"
  exit 1
fi

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
  pm2 restart "${PM2_CONFIG}" --only "${APP_NAME}"
else
  echo "==> Start new PM2 app"
  pm2 start "${PM2_CONFIG}"
fi

echo "==> Save PM2 process list"
pm2 save

echo "==> Deployment complete"
pm2 status "${APP_NAME}"
