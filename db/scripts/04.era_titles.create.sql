DROP TABLE IF EXISTS "era_titles";

CREATE TABLE IF NOT EXISTS "era_titles" (
    "era" VARCHAR(512) NOT NULL,
    "title" VARCHAR(512) NOT NULL,
    "order" INTEGER
);

ALTER TABLE "era_titles"
    ADD CONSTRAINT "fk_era_titles__era" FOREIGN KEY ("era") REFERENCES "eras"("name");

ALTER TABLE "era_titles"
    ADD CONSTRAINT "fk_era_titles__title" FOREIGN KEY ("title") REFERENCES "titles"("title");
