#!/usr/bin/env bash

DATABASE_SOLUTION_FOLDER="$(pwd)/database"
DATABASE_DATA_FOLDER="$(pwd)/database-data";
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

node "${DATABASE_SOLUTION_FOLDER}/main.mjs";
exit 0;
