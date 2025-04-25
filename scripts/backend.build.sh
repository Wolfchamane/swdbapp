#!/usr/bin/env bash

ENV=$1
ENVIRONMENT_FILE="$(pwd)/environments/.env${ENV}";
BACKEND_DOCKER_FILE="$(pwd)/apps/backend/Dockerfile";

OS="$(uname | tr '[:upper:]' '[:lower:]')"
PLATFORM=

if [ "$OS" == "darwin" ]; then
    PLATFORM="linux/arm64";
elif [ "$OS" == "linux" ]; then
    PLATFORM="linux/amd64";
fi

if [ -z "$PLATFORM" ]; then
    echo "Could not determine platform for $OS operative system!";
    exit 1;
fi

if ! [ -f "$BACKEND_DOCKER_FILE" ]; then
    echo "Could not found '$BACKEND_DOCKER_FILE' file!";
    exit 1;
fi

if ! [ -f "$ENVIRONMENT_FILE" ]; then
    echo "Could not found '$ENVIRONMENT_FILE' file!";
    exit 1;
else
    echo "Loading environment variables";

    # Read each line of the .env file
    while IFS='=' read -r key value; do
      # Skip comments and empty lines
      if [[ $key == \#* ]] || [[ -z $key ]]; then
        continue;
      fi
      export $key="$value";
    done < "$ENVIRONMENT_FILE";
fi

docker build -D -t wolfchamane/swdbapp:backend \
    --platform="$PLATFORM" \
    --build-arg BACKEND_ACCEPT_ORIGIN="${BACKEND_ACCEPT_ORIGIN}" \
    --build-arg BACKEND_PORT="${BACKEND_PORT}" \
    --build-arg PG_USER="${PGUSER}" \
    --build-arg PG_PASSWORD="${PGPASSWORD}" \
    --build-arg PG_HOST="${PGHOST}" \
    --build-arg PG_PORT="${PGPORT}" \
    --build-arg PG_DATABASE="${PGDATABASE}" \
    --build-arg API_KEY="${VITE_API_KEY}" \
    -f "${BACKEND_DOCKER_FILE}" \
    .
