#!/usr/bin/env bash

ENV=$1
ENVIRONMENT_FILE="$(pwd)/environments/.env${ENV}";
DATABASE_DOCKER_FILE="$(pwd)/database/Dockerfile";

if ! [ -f "$DATABASE_DOCKER_FILE" ]; then
    echo "Could not found '$DATABASE_DOCKER_FILE' file!";
    exit 1;
fi

if [ "${ENV}" != "production" ]; then
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

docker run --name swdbapp-database \
    -e POSTGRES_USER="${POSTGRES_USER}" \
    -e POSTGRES_PASSWORD="${POSTGRES_PASSWORD}" \
    -p 5432:5432 \
    -d wolfchamane/swdbapp:database
