#!/usr/bin/env bash

CI_FLAG=$1;
LOCAL_ENV_FILE="$(pwd)/environments/.env.local";
BACKEND_DOCKER_FILE="$(pwd)/backend/Dockerfile";

echo "CI_FLAG=$CI_FLAG";

if ! [ -f "$BACKEND_DOCKER_FILE" ]; then
    echo "Could not found '$BACKEND_DOCKER_FILE' file!";
    exit 1;
fi

if [ -z "$CI_FLAG" ]; then
    echo "Loading local environment variables";

    if ! [ -f "$LOCAL_ENV_FILE" ]; then
        echo "Could not found '$LOCAL_ENV_FILE' file!";
        exit 1;
    fi

    # Read each line of the .env file
    while IFS='=' read -r key value; do
      # Skip comments and empty lines
      if [[ $key == \#* ]] || [[ -z $key ]]; then
        continue;
      fi
      echo "Defining $key=$value";
      export $key="$value";
    done < "$LOCAL_ENV_FILE";
fi

docker build -D -t swdbapp-backend-image \
    --build-arg BACKEND_ACCEPT_ORIGIN="${BACKEND_ACCEPT_ORIGIN}" \
    --build-arg BACKEND_PORT="${BACKEND_PORT}" \
    --build-arg PG_USER="${PGUSER}" \
    --build-arg PG_PASSWORD="${PGPASSWORD}" \
    --build-arg PG_HOST="${PGHOST}" \
    --build-arg PG_PORT="${PGPORT}" \
    --build-arg PG_DATABASE="${PGDATABASE}" \
    -f "${BACKEND_DOCKER_FILE}" \
    .
