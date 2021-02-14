#!/usr/bin/env bash

# Log Each command
set -x

# Bail on first error
set -e

if [[ "$CI" ]]; then
  echo "In CI environment."
else
  echo "🚧 Not in CI environment. 🚧"
  BRANCH_NAME=$(git branch --show-current)

  if [[ "$BRANCH_NAME" = "master" ]]; then
    npx --no-install lerna run deploy
    git commit -m "chore(deploy): publish importmap" --allow-empty
    echo "✅ Import map published."
    git push
  else
    echo "Not on master branch. Skipping deploy."
  fi
fi