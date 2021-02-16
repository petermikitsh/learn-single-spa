#!/usr/bin/env bash

# Log Each command
set -x

# Bail on first error
set -e

BASE_DIR=$(dirname $0)
SUBPACKAGE_DIR="$(dirname $( cd "$BASE_DIR" ; pwd -P ))"
CURR_VERSION=$(node -p "require('${SUBPACKAGE_DIR}/package.json').version")

npx --no-install gh-pages --add \
  --dist $SUBPACKAGE_DIR/dist \
  --src "**/!(*.html)" \
  --dest @exampleorg/app1/${CURR_VERSION}
