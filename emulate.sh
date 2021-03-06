#!/bin/bash

# Exit on error.
set -e

# Build host.
npm --prefix public run build

# Start emulator.-
GOOGLE_APPLICATION_CREDENTIALS=$(pwd)/google_creds.json
FIREBASE_DATABASE_EMULATOR_HOST="localhost:9000"
firebase emulators:start --only hosting --import=./data --export-on-exit &
EMULATOR_PID=$!

# Start watchers in the background
npm --prefix public run watch_ts &
HOSTING_TS_PID=$!

npm --prefix public run watch_pug &
HOSTING_PUG_PID=$!

trap 'kill $(jobs -p) && wait && echo Successfully exited' SIGINT SIGTERM EXIT

read  -n 1 -p "Press Enter to Stop:" mainmenuinput
