DROP TABLE IF EXISTS swdb_pro."era_titles";

CREATE TABLE IF NOT EXISTS swdb_pro."era_titles" (
    "era" VARCHAR(512) NOT NULL,
    "title" VARCHAR(512) NOT NULL,
    "order" INTEGER
);

ALTER TABLE swdb_pro."era_titles"
    ADD CONSTRAINT "fk_era_titles__era" FOREIGN KEY ("era") REFERENCES swdb_pro."eras"("name");

ALTER TABLE swdb_pro."era_titles"
    ADD CONSTRAINT "fk_era_titles__title" FOREIGN KEY ("title") REFERENCES swdb_pro."titles"("name");


INSERT INTO swdb_pro."era_titles" ("order", "era", "title") VALUES
	(0, 'The High Republic', 'The High Republic'),
	(1, 'The High Republic', 'Star Wars: Young Jedi Adventures'),
	(2, 'The High Republic', 'The Acolyte'),
	(0, 'Fall of the Jedi', 'Star Wars Episode I: The Phantom Menace'),
	(1, 'Fall of the Jedi', 'Tales of the Jedi'),
	(2, 'Fall of the Jedi', 'Star Wars Episode II: Attack of the Clones'),
	(3, 'Fall of the Jedi', 'Star Wars: The Clone Wars'),
	(4, 'Fall of the Jedi', 'Star Wars Episode III: Revenge of the Sith'),
	(0, 'Reign of the Empire', 'Tales of the Empire'),
	(1, 'Reign of the Empire', 'Star Wars: The Bad Batch'),
	(2, 'Reign of the Empire', 'Star Wars: Jedi Fallen Order'),
	(3, 'Reign of the Empire', 'Solo'),
	(4, 'Reign of the Empire', 'Obi Wan Kenobi'),
	(5, 'Reign of the Empire', 'Star Wars: Jedi Survivor'),
	(6, 'Reign of the Empire', 'Andor'),
	(7, 'Reign of the Empire', 'Star Wars: Rebels'),
	(8, 'Reign of the Empire', 'Vader Immortal Episode I'),
	(9, 'Reign of the Empire', 'Rogue One'),
	(0, 'Age of Rebellion', 'Star Wars Episode IV: A New Hope'),
	(1, 'Age of Rebellion', 'Star Wars Episode V: The Empire Strikes Back'),
	(2, 'Age of Rebellion', 'Star Wars: Outlaws'),
	(3, 'Age of Rebellion', 'Star Wars Episode VI: Return of the Jedi'),
	(4, 'Age of Rebellion', 'Star Wars: Battlefront II'),
	(5, 'Age of Rebellion', 'Star Wars: Squadrons'),
	(0, 'The New Republic', 'The Mandalorian'),
	(1, 'The New Republic', 'The Book of Boba Fett'),
	(2, 'The New Republic', 'Star Wars: Ahsoka'),
	(3, 'The New Republic', 'Star Wars: Skeleton Crew'),
	(0, 'Rise of the First Order', 'Star Wars: Resistance'),
	(1, 'Rise of the First Order', 'Star Wars Episode VII: The Force Awakens'),
	(2, 'Rise of the First Order', 'Star Wars Episode VIII: The Last Jedi'),
	(3, 'Rise of the First Order', 'Star Wars: Tales from the galaxy''s edge'),
	(4, 'Rise of the First Order', 'Star Wars Episode IX: The Rise of Skywalker');