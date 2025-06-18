#!/usr/bin/env bash

ENV=$1
if [ -z "$ENV" ]; then
    ENV="development";
fi
ENVIRONMENT_FILE="$(pwd)/.env/.env.${ENV}";
DATABASE_SOLUTION_FOLDER="$(pwd)/apps/database"
DATABASE_DATA_FOLDER="$DATABASE_SOLUTION_FOLDER/data";
NODE_PATH="$(which node)";

if ! [ -d "${DATABASE_SOLUTION_FOLDER}" ]; then
    echo "Missing '${DATABASE_SOLUTION_FOLDER}' folder!";
    exit 1;
fi

if ! [ -d "${DATABASE_DATA_FOLDER}" ]; then
    echo "Missing '${DATABASE_DATA_FOLDER}' folder!";
    exit 1;
fi

if ! [ -e "${NODE_PATH}" ]; then
    echo "Missing Node & NPM!";
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

node "${DATABASE_SOLUTION_FOLDER}/main.mjs";
exit 0;
