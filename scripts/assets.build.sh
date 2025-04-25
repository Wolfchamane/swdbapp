#!/usr/bin/env bash

ASSETS_PATH="$(pwd)/apps/assets";

OS="$(uname | tr '[:upper:]' '[:lower:]')"
PLATFORM=
if [ "$OS" == "darwin" ]; then
    PLATFORM="linux/arm64";
elif [ "$OS" == "linux" ]; then
    PLATFORM="linux/amd64";
fi

if [ -f "$ASSETS_PATH" ]; then
    echo "Could not find $ASSETS_PATH folder!";
    exit 1;
fi

if [ -z "$PLATFORM" ]; then
    echo "Could not determine platform for $OS operative system!";
    exit 1;
fi

cd "$ASSETS_PATH" || return;

docker build -D -f "$ASSETS_PATH/Dockerfile" \
    --platform="$PLATFORM" \
    -t wolfchamane/swdbapp:assets \
    .;
