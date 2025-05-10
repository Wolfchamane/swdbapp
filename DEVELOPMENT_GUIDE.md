> [!CAUTION]
> This content is only for contributors of this project.

> [!NOTE]
> You will need access to some _private_ repositories as well.
> Ask [Arturo Martínez Díaz](mailto:arturo.martinez@amartinez.dev) for required invitations.

# Development Guide

**Requirements**:

- A web browser of your choice.
- [NodeJS@v22.14.0](https://nodejs.org/en) + NPM@11.2.0
- Any text editor or IDE of your choice, I highly suggest [WebStorm](https://www.jetbrains.com/es-es/webstorm/).
- [Docker](https://www.docker.com/).
- Java

## Environment Files

You will require to create three (3) files in your local copy of this project, to know:

- `/enviroments/.env`
- `/enviroments/.env.docker`
- `/enviroments/.env.production`

> [!NOTE]
> Ask [Arturo Martínez Díaz](mailto:arturo.martinez@amartinez.dev) for details of the content of these files.

## Installation

Do the following:

```shell
git clone git@github.com:Wolfchamane/swdbapp.git
cd swdbapp
git submodule update --init --recursive
npm ci
```

## API

Running the following at any `/feature/*/api-spec` folder:

```shell
make serve
```

Will allow you to see the feature API spec at http://localhost:8000.

## HTTP Infra Generation

**Firstly**, compile the [SWDBApp OpenAPI custom generator](https://github.com/Wolfchamane/swdbapp-infra-generator).

**Secondly**, copy the resultant `*.jar` file at `/tools/swdbapp-api-generator` folder.

**Thirdly**, compile the Docker `swdbapp-infra-generator` image by running:

```shell
docker build \
  --build-arg ARG_OPENAPI_GENERATOR_VERSION="7.1.0" \
  -t swdbapp-infra-generator \
  -f /tools/swdbapp-api-generator/Dockerfile .
```

**Eventually**, run the following at any `/feature/*/api-spec` folder:

```shell
$ make generate_code
```

## Run locally

You can run both `backend` and `frontend` using available NPM scripts at their locations.

### Backend

To run the `backend` solution you must first execute the database locally by running:

```shell
# if not done yet, generate DB inserts:
./scripts/database.generate.sh
# fi
./scripts/database.build.sh
./scripts/database.start.sh
```

Then you can go and execute:

```shell
cd /app/backend
npm run dev
```

You'll be able to check out the backend at http://localhost:3000/api

### Frontend

Choose the solution you would like to run, to know: vue-js, react-js or web-components.

Then, you must prepare the environment by running the static assets' solution:

```shell
./scripts/assets.build.sh
./scripts/assets.start.sh
```

Ensure you have the backend also running. Now you are ready to spin up the frontend, for example:

```shell
cd /apps/frontend/vue-js
npm run dev
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
./scripts/assets.build.sh docker
./scripts/assets.start.sh docker
# if not done yet, generate DB inserts:
./scripts/database.generate.sh
# fi
./scripts/database.build.sh docker
./scripts/database.start.sh docker
./scripts/backend.run.sh docker
./scripts/backend.start.sh docker
```

## Git Workflow

Following a [Trunc Based Development](https://trunkbaseddevelopment.com/), `master` branch is **protected**, is
where all code branch should start and end.

As **protected** branch, just a few contributors has access to directly push content into `master` branch, therefore,
for any content you need to integrate into `master` branch you must create a new Pull-Request.

### Branch strategy

The pattern to use in order to create new branches goes as follows:

- `<type>/<ref>/short-description`

See [Branch/Commit placeholders](#/branch-and-commit-placeholders) to obtain information about placeholders.

### Commit strategy

The pattern to use in commits is the following:

```text
<type> (<context>): meaningful description \
could be multiline if required

[<ref>]
```

See [Branch/Commit placeholders](#/branch-and-commit-placeholders) to obtain information about placeholders.

#### Branch and Commit placeholders

- `<type>` could be anyone of following:

| Type | Description                                                   |   Branch target/source   |
|:---:|:--------------------------------------------------------------|:------------------------:|
| `feature` or `feat` | Related to any new content or modification of current content |          `any`           |
| `ref` | Related to any refactor | `any` |
| `fix` | Related to any tracked/reported bug solution                  |          `any`           |
| `hotfix` | Related to any critical bug that must be solve ASAP.          | `master` or  `release/*` |
| `chore` | Generic or architectural changes                              |          `any`           |
| `task` | Produced as an outcome of automated execution                 |          `any`           |
| `doc` | Related with changes into documentation                       |          `any`           |

- `<context>` will be the specific folder or file paths affected by changes.
  - Could be a wildcard (`*`) if it applies to several folders or files.
  - Could also be a [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)), i.e.: `/features/eras/backend/*`, `/features/titles/frotnend/**/*.ts`, etc..
- `<ref>` is the project management ID task identifier.
  - Could be `NO-REF` is no task is associated.

## CI/CD Workflow

All `pull-request` are protected with a GitHub Action Workflow so the code is:

- Evaluated against `prettier` rules.
- Evaluated against `eslint` rules.
- ~~Tested against unit tests coverage thresholds and snapshots.~~ (W.I.P.)
- ~~Tested against e2e integration tests.~~ (W.I.P.)
