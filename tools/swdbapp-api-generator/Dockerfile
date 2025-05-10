FROM openjdk:11-jre-slim

USER root

RUN apt-get update && apt-get install -y wget

ENV OPENAPI_GENERATOR_VERSION=7.1.0

WORKDIR /app

RUN wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.1.0/openapi-generator-cli-7.1.0.jar -O openapi-generator-cli.jar

COPY /tools/swdbapp-api-generator/swdbapp-http-infra-generator-plugin-1.0.0.jar ./

ENTRYPOINT ["java", "-cp", "swdbapp-http-infra-generator-plugin-1.0.0.jar:openapi-generator-cli.jar", "org.openapitools.codegen.OpenAPIGenerator"]
