FROM postgres:latest

WORKDIR /docker-entrypoint-initdb.d
COPY ./database/output ./

# Expose the PostgreSQL port
EXPOSE 5432

CMD ["postgres"]
