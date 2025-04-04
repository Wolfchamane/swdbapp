#!/usr/bin/env bash

SCRIPTS_FOLDER="$(pwd)/db/scripts"

if ! [ -d "${SCRIPTS_FOLDER}" ]; then
    echo "Could not found '${SCRIPTS_FOLDER}' directory!"
    exit 1
fi

docker run --name swdbapp-database \
    --env-file "$(pwd)/.env" \
    -p 5432:5432 \
    -v "$(pwd)/db/scripts":/docker-entrypoint-initdb.d \
    -d postgres
