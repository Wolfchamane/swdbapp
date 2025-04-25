FROM postgres:latest

WORKDIR /docker-entrypoint-initdb.d
COPY ./apps/database/output ./

# Expose the PostgreSQL port
EXPOSE 5432

CMD ["postgres"]
