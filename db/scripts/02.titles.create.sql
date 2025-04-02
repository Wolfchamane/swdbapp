DROP TABLE IF EXISTS "titles";

CREATE TABLE "titles" (
    "id" serial NOT NULL,
    "title" VARCHAR(512) UNIQUE NOT NULL,
    "logo"	VARCHAR(512)
);

ALTER TABLE "titles"
    ADD CONSTRAINT "pk_titles" PRIMARY KEY ("id", "title");
