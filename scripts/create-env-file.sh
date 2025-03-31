#!/usr/bin/env bash

echo "VITE_ASSETS_DIR=../assets" >> .env
echo "VITE_DATA_BANK_API_HOSTNAME=starwars-databank-server.vercel.app/api/v1" >> .env
echo "VITE_DATA_BANK_API_PORT=" >> .env
echo "VITE_DATA_BANK_API_PROTOCOL=https" >> .env
echo "VITE_SW_API_HOSTNAME=swapi.dev/api" >> .env
echo "VITE_SW_API_PORT=" >> .env
echo "VITE_SW_API_PROTOCOL=https" >> .env
