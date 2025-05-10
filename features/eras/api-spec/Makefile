SHELL=/bin/bash -o pipefail
GIT_ROOT_DIR:=$(shell git rev-parse --show-toplevel)

.PHONY: lint
lint: build
	@npx spectral lint generated/bundle.yaml

.PHONY: generate_code
generate_code:
	@docker run -v ${GIT_ROOT_DIR}:/local --rm swdbapp-api-generator \
	    generate \
	    -g io.wolfchamane.openapigenerators.SwdbappHttpInfraGenerator \
	    -i /local/features/eras/api-spec/generated/bundle.yaml \
	    -o /local/features/eras/infra/http \
	    -c /local/features/eras/api-spec/config.yaml

.PHONY: build
build:
	@echo ">> Building bundle"
	@npx redocly bundle --ext yaml ${PWD}/index.yaml -o ${PWD}/generated/bundle.yaml

.PHONY: serve
serve: build
	@echo ">> Serving API"
	@python3 -m http.server 8000
