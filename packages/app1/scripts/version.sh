#!/usr/bin/env bash

# Log Each command
set -x

# Bail on first error
set -e

BASE_DIR=$(dirname $0)
SUBPACKAGE_DIR="$(dirname $( cd "$BASE_DIR" ; pwd -P ))"
CURR_VERSION=$(node -p "require('${SUBPACKAGE_DIR}/package.json').version")
SRC_GLOB="$SUBPACKAGE_DIR/dist/!(*.html)"

npx --no-install gh-pages --add --src $SRC_GLOB --dist @exampleorg/app1/${CURR_VERSION}
