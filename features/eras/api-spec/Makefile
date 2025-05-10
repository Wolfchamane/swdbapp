SHELL=/bin/bash -o pipefail
GIT_ROOT_DIR:=$(shell git rev-parse --show-toplevel)
CURRENT_DIR=$(pwd)

.PHONY: lint
lint: build
	@npx spectral lint generated/bundle.yaml

.PHONY: generate_code
generate_code:
	@echo ">> Generate HTTP Infra code from API Spec"
	@export OPENAPI_GENERATOR_VERSION=7.1.0
	@rm -fr ../infra/http/clients ../infra/http/models
	@java -cp ${GIT_ROOT_DIR}/.bin/swdbapp-http-infra-generator-plugin-1.0.0.jar:${GIT_ROOT_DIR}/tools/openapi-generator-cli-7.1.0.jar \
      org.openapitools.codegen.OpenAPIGenerator generate \
      -g io.wolfchamane.openapigenerators.SwdbappHttpInfraGenerator \
      -i ./generated/bundle.yaml \
      -o ../infra/http \
      -c ./config.yaml
	@echo ">> Formating generated HTTP Infra code"
	@cd ../infra/http && npm run format:fix


.PHONY: build
build:
	@echo ">> Building bundle"
	@npx redocly bundle --ext yaml ${PWD}/index.yaml -o ${PWD}/generated/bundle.yaml
