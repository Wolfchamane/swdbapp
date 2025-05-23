#!/usr/bin/env bash

ENV=$1
if [ -z "$ENV" ]; then
    ENV="development";
fi
ENVIRONMENT_FILE="$(pwd)/.env/.env.${ENV}";

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

docker run --name swdbapp-backend \
    -e BACKEND_ACCEPT_ORIGIN="${BACKEND_ACCEPT_ORIGIN}" \
    -e BACKEND_PORT="${BACKEND_PORT}" \
    -e PGPORT="${PGPORT}" \
    -e PGHOST="${PGHOST}" \
    -e PGUSER="${PGUSER}" \
    -e PGPASSWORD="${PGPASSWORD}" \
    -e PGDATABASE="${PGDATABASE}" \
    -e VITE_API_KEY="${VITE_API_KEY}" \
    -p 3000:3000 \
    wolfchamane/swdbapp:backend
