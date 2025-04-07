#!/usr/bin/env bash

docker run --name swdbapp-assets \
    -p 4000:80 \
    -d wolfchamane/swdbapp:assets
