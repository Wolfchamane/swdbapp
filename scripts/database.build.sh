#!/usr/bin/env bash

ENV=$1
if [ -z "$ENV" ]; then
    ENV="development";
fi
ENVIRONMENT_FILE="$(pwd)/.env/.env.${ENV}";
DATABASE_DOCKER_FILE="$(pwd)/apps/database/Dockerfile";

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

if ! [ -f "$DATABASE_DOCKER_FILE" ]; then
    echo "Could not found '$DATABASE_DOCKER_FILE' file!";
    exit 1;
fi

if ! [ -f "$ENVIRONMENT_FILE" ]; then
    echo "Could not found '$ENVIRONMENT_FILE' file!";
    exit 1;
else
    echo "Loading '$ENV' environment variables";
    # Read each line of the .env file
    while IFS='=' read -r key value; do
      # Skip comments and empty lines
      if [[ $key == \#* ]] || [[ -z $key ]]; then
        continue;
      fi
      export $key="$value";
    done < "$ENVIRONMENT_FILE";
fi

docker build -D -t wolfchamane/swdbapp:database \
    --platform="$PLATFORM" \
    -f "${DATABASE_DOCKER_FILE}" \
    .
