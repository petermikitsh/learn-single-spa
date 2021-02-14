#!/usr/bin/env bash

# Log Each command
set -x

# Bail on first error
set -e

npx --no-install gh-pages --dist dist --dest .
