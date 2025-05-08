SHELL=/bin/bash -o pipefail
GIT_ROOT_DIR:=$(shell git rev-parse --show-toplevel)

# Standard mandatory tasks

.PHONY: lint
lint: build
	@echo "Not applicable"

.PHONY: generate_code
generate_code:
	@echo "Not applicable"

.PHONY: unit_test
unit_test:
	@echo "Not applicable"

.PHONY: integration_test
integration_test:
	@echo "Not applicable"

.PHONY: compatibility_matrix
compatibility_matrix:
	@echo "Not applicable"

.PHONY: e2e_test
e2e_test:
	@echo "Not applicable"

.PHONY: build
build:
	@echo ">> Building bundle"
	@npx redocly bundle --ext yaml ${PWD}/index.yaml -o ${PWD}/generated/bundle.yaml

# Tools tasks

.PHONY: tools.validate
tools.validate:
	@echo "Not applicable"

.PHONY: tools.generate_backend_http_infra
tools.generate_backend_http_infra:
	@echo "Not applicable"

.PHONY: tools.generate_frontend_http_infra
tools.generate_frontend_http_infra:
	@echo "Not applicable"

.PHONY: tools.serve
tools.serve: build
	@echo ">> Serving API"
	@python3 -m http.server 8000
