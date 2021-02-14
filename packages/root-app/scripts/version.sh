#!/usr/bin/env bash

# Log Each command
set -x

# Bail on first error
set -e

yarn run gh-pages --add \
  --dist dist \
  --dest .
