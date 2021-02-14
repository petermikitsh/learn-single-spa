#!/usr/bin/env bash

# Log Each command
set -x

# Bail on first error
set -e

BASE_DIR=$(dirname $0)
SUBPACKAGE_DIR="$(dirname $( cd "$BASE_DIR" ; pwd -P ))"

yarn run gh-pages --add \
  --dist $SUBPACKAGE_DIR \
  --src "importmap.*.json" \
  --dest .
