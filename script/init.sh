#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

createuser -s podq
createdb --owner podq podq-dev
