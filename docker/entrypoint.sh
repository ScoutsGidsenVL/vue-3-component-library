#!/bin/sh

set -e

echo "Starting component library"
npm install -g @vue/cli
exec npm run dev