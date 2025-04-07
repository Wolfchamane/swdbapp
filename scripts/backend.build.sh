#!/usr/bin/env bash

ENV=$1
ENVIRONMENT_FILE="$(pwd)/environments/.env.${ENV}";
BACKEND_DOCKER_FILE="$(pwd)/backend/Dockerfile";

if ! [ -f "$BACKEND_DOCKER_FILE" ]; then
    echo "Could not found '$BACKEND_DOCKER_FILE' file!";
    exit 1;
fi

if [ "${ENV}" == "development" ] || [ "${ENV}" == "local" ]; then
    echo "Loading environment variables";

    if ! [ -f "$ENVIRONMENT_FILE" ]; then
        echo "Could not found '$ENVIRONMENT_FILE' file!";
        exit 1;
    fi

    # Read each line of the .env file
    while IFS='=' read -r key value; do
      # Skip comments and empty lines
      if [[ $key == \#* ]] || [[ -z $key ]]; then
        continue;
      fi
      export $key="$value";
    done < "$ENVIRONMENT_FILE";
fi

docker build -D -t swdbapp-backend-image \
    --platform=linux/amd64 \
    --build-arg BACKEND_ACCEPT_ORIGIN="${BACKEND_ACCEPT_ORIGIN}" \
    --build-arg BACKEND_PORT="${BACKEND_PORT}" \
    --build-arg PG_USER="${PGUSER}" \
    --build-arg PG_PASSWORD="${PGPASSWORD}" \
    --build-arg PG_HOST="${PGHOST}" \
    --build-arg PG_PORT="${PGPORT}" \
    --build-arg PG_DATABASE="${PGDATABASE}" \
    -f "${BACKEND_DOCKER_FILE}" \
    .
