#!/usr/bin/env bash

if ! [ -f "$(pwd)/.env" ]; then
    echo "Could not found '$(pwd)/.env' file!"
    exit 1
fi

# Read each line of the .env file
while IFS='=' read -r key value; do
  # Skip comments and empty lines
  if [[ $key == \#* ]] || [[ -z $key ]]; then
    continue
  fi
  export $key="$value"
done < "$(pwd)/.env"

if ! [ -f "$(pwd)/docker/Dockerfile.backend" ]; then
    echo "Could not found '$(pwd)/docker/Dockerfile.backend' file!"
    exit 1
fi

docker build -D -t swdbapp-backend-image \
    --build-arg BACKEND_ACCEPT_ORIGIN="${BACKEND_ACCEPT_ORIGIN}" \
    --build-arg BACKEND_PORT="${BACKEND_PORT}" \
    --build-arg PG_USER="${PGUSER}" \
    --build-arg PG_PASSWORD="${PGPASSWORD}" \
    --build-arg PG_HOST="${PGHOST}" \
    --build-arg PG_PORT="${PGPORT}" \
    --build-arg PG_DATABASE="${PGDATABASE}" \
    -f "$(pwd)/docker/Dockerfile.backend" \
    "$(pwd)"
