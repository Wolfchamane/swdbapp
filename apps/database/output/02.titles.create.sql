DROP TABLE IF EXISTS "titles";

CREATE TABLE "titles" (
    "id" serial NOT NULL,
    "name" VARCHAR(512) UNIQUE NOT NULL,
    "logo"	VARCHAR(512),
    "type"  VARCHAR(16),
    "poster" VARCHAR(512),
    "rating" VARCHAR(16),
    "duration" VARCHAR(13),
    "release_date" VARCHAR(32),
    "genre" VARCHAR(128),
    "resume" TEXT,
    "director" VARCHAR(128),
    "music_director" VARCHAR(128),
    "producers" VARCHAR(512),
    "actors" VARCHAR(1024),
    "plot" TEXT,
    "opening_crawl" TEXT
);

ALTER TABLE "titles"
    ADD CONSTRAINT "pk_titles" PRIMARY KEY ("id", "name");
