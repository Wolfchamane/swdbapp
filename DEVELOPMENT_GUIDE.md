> [!CAUTION]
> This content is only for contributors of this project.

# Development Guide

**Requirements**:

- A web browser of your choice.
- [NodeJS@v22.14.0](https://nodejs.org/en) + NPM@11.2.0
- Any text editor or IDE of your choice, I highly suggest [WebStorm](https://www.jetbrains.com/es-es/webstorm/).
- [Docker](https://www.docker.com/).

## Environment Files

You will require to create three (3) files in your local copy of this project, to know:

- `/enviroments/.env`
- `/enviroments/.env.docker`
- `/enviroments/.env.production`

As [Arturo Martínez Díaz](mailto:arturo.martinez@amartinez.dev) for details of the content of these files.

## Installation

Do the following:

```shell
$ git clone git@github.com:Wolfchamane/swdbapp.git
$ cd swdbapp
$ git submodule update --init --recursive
$ npm ci
```

## Run locally

You can run both `backend` and `frontend` using available NPM scripts at their locations.

### Backend

To run the `backend` solution you must first execute the database locally by running:

```shell
# if not done yet, generate DB inserts:
$ ./scripts/database.generate.sh
# fi
$ ./scripts/database.build.sh
$ ./scripts/database.start.sh
```

Then you can go and execute:

```shell
$ cd /app/backend
$ npm run dev
```

You'll be able to check out the backend at http://localhost:3000/api

### Frontend

Choose the solution you would like to run, to know: vue-js, react-js or web-components.

Then, you must prepare the environment by running the static assets' solution:

```shell
$ ./scripts/assets.build.sh
$ ./scripts/assets.start.sh
```

Ensure you have the backend also running. Now you are ready to spin up the frontend, for example:

```shell
$ cd /apps/frontend/vue-js
$ npm run dev
```

You will have access to the application at http://localhost:8080/#/

## Run in Docker (locally)

To run the whole solution locally using `Docker`, do the following:

```shell
docker-compose --env-file ./environments/.env.docker build && \
  docker-compose --env-file ./environments/.env.docker up
```

Or run the `scripts` in this **strict** order:

```shell
$ ./scripts/assets.build.sh docker
$ ./scripts/assets.start.sh docker
# if not done yet, generate DB inserts:
$ ./scripts/database.generate.sh
# fi
$ ./scripts/database.build.sh docker
$ ./scripts/database.start.sh docker
$ ./scripts/backend.run.sh docker
$ ./scripts/backend.start.sh docker
```

## Git Workflow

Following a [Trunc Based Development](https://trunkbaseddevelopment.com/), `master` branch is **protected**, is
where all code branch should start and end.

As **protected** branch, just a few contributors has access to directly push content into `master` branch, therefore,
for any content you need to integrate into `master` branch you must create a new Pull-Request.

## CI/CD Workflow

All `pull-request` are protected with a GitHub Action Workflow so the code is:

- Evaluated against `prettier` rules.
- Evaluated against `eslint` rules.
- ~~Tested against unit tests coverage thresholds and snapshots.~~ (W.I.P.)
- ~~Tested against e2e integration tests.~~ (W.I.P.)
