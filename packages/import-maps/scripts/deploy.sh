#!/usr/bin/env bash

# Log Each command
set -x

# Bail on first error
set -e

BASE_DIR=$(dirname $0)
SUBPACKAGE_DIR="$(dirname $( cd "$BASE_DIR" ; pwd -P ))"
SRC_GLOB="$SUBPACKAGE_DIR/importmap.json"

npx --no-install gh-pages --src $SRC_GLOB --dist importmap.json

