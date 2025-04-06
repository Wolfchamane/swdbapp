#!/usr/bin/env bash

SCRIPTS_FOLDER="$(pwd)/database/output";
ENVIRONMENTS_FOLDER="$(pwd)/environments";

if ! [ -d "${SCRIPTS_FOLDER}" ]; then
    echo "Could not found '${SCRIPTS_FOLDER}' directory!"
    exit 1
fi

if ! [ -d "${ENVIRONMENTS_FOLDER}" ]; then
    echo "Could not found '${ENVIRONMENTS_FOLDER}' directory!"
    exit 1
fi

docker run --name swdbapp-database \
    --env-file "${ENVIRONMENTS_FOLDER}/.env.local" \
    -p 5432:5432 \
    -v "${SCRIPTS_FOLDER}":/docker-entrypoint-initdb.d \
    -d postgres
