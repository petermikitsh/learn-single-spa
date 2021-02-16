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
  CURR_COMMIT_MSG=$(git log -1 --pretty=format:%B)
  BASEDIR=$(dirname $0)
  CURR_VERSION=$(node -p "require('${BASEDIR}/../lerna.json').version")
  GIT_SHA=$(git rev-parse --short HEAD)

  if [[ "$BRANCH_NAME" = "master" ]]; then
    echo "On master branch. Commit message is '$CURR_COMMIT_MSG'."
    # Skip if this is a version/release commit
    if [[ "$CURR_COMMIT_MSG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
      echo "Current commit message is a semantic release ($CURR_COMMIT_MSG). Exiting early."
      exit 0
    fi

    # echo "Creating canary release; not in CI environment."
    # RELEASE_NAME="$CURR_VERSION-canary-$GIT_SHA-$RANDOM"

    npm run clean
    npm run build

    npx --no-install lerna version \
      --conventional-commits \
      --force-publish \
      --no-push \
      --exact \
      --yes
    git push --follow-tags
  fi
fi

# RELEASE_NAME="$CURR_VERSION-canary-$GIT_SHA-$RANDOM"
# npx --no-install lerna version --conventional-commits --force-publish --yes
