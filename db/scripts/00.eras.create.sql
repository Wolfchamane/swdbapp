DROP TABLE IF EXISTS "eras";

CREATE TABLE "eras" (
    "id" serial NOT NULL,
    "name" VARCHAR(512) UNIQUE NOT NULL,
    "image"	VARCHAR(512),
    "description" VARCHAR(512)
);

ALTER TABLE "eras"
    ADD CONSTRAINT "pk_eras" PRIMARY KEY ("id", "name");
