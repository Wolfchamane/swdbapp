#!/usr/bin/env bash

ASSETS_PATH="$(pwd)/www/software/swdbapp/assets";

if [ -f "$ASSETS_PATH" ]; then
    echo "Could not find $ASSETS_PATH folder!";
    exit 1;
fi

cd "$ASSETS_PATH" || return;

docker build -D -f "$ASSETS_PATH/Dockerfile" \
    --platform=linux/amd64,linux/arm64 \
    -t wolfchamane/swdbapp:assets \
    .;
