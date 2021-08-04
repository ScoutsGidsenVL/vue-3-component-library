#!/bin/sh

set -e

echo "Starting component library"
npm install --global rollup &&
npm  install &&
exec npm run dev