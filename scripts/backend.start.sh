#!/usr/bin/env bash

docker run --name swdbapp-backend \
    -p 3000:3000 \
    swdbapp-backend-image
