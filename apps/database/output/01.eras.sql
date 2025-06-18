DROP TABLE IF EXISTS swdb_pro."eras";

CREATE TABLE swdb_pro."eras"
(
	"id"          serial              NOT NULL,
	"name"        VARCHAR(512) UNIQUE NOT NULL,
	"image"       VARCHAR(512),
	"description" VARCHAR(512)
);

ALTER TABLE swdb_pro."eras"
	ADD CONSTRAINT "pk_eras" PRIMARY KEY ("id", "name");

INSERT INTO swdb_pro."eras" ("name", "image", "description") VALUES
	('Dawn Of The Jedi', 'https://lumiere-a.akamaihd.net/v1/images/era1_off_7f296355.png', NULL),
	('The Old Republic', 'https://lumiere-a.akamaihd.net/v1/images/era2_218980de.png', 'The Republic is founded among the worlds of the Galactic Core, and the Jedi Order emerges to protect it. A schism within the Jedi leads to the creation of the Sith in this epic era.'),
	('The High Republic', 'https://lumiere-a.akamaihd.net/v1/images/era3_bb90bcab.png', 'Under the protection of the Jedi Knights and the wise rule of the Senate, the Republic grows into a golden age. The vast Outer Rim beckons the intrepid seeking to discover new worlds and spread the optimism of the Republic.'),
	('Fall of the Jedi', 'https://lumiere-a.akamaihd.net/v1/images/era4_9f138687.png', 'A long forgotten menace returns as a Sith lord orchestrates a devastating conflict, plunging the galaxy into full scale war with the Jedi Knights at the frontlines.'),
	('Reign of the Empire', 'https://lumiere-a.akamaihd.net/v1/images/era5_67cf4464.png', 'Through treachery and deception, the Galactic Empire rules unchallenged and grows in military might. A scant few Jedi survivors retreat into the shadows as they are hunted down mercilessly.'),
	('Age of Rebellion', 'https://lumiere-a.akamaihd.net/v1/images/era6_abd16787.png', 'Outnumbered, the Rebellion spreads across the galaxy. Rebel heroes fan the flickering light of hope in a heroic stand against the evil Galactic Empire.'),
	('The New Republic', 'https://lumiere-a.akamaihd.net/v1/images/era7_97f8dddf.png', 'The Empire has been defeated, and the emergent New Republic faces the great challenge of rebuilding and reuniting the galaxy. It is a tentative and fragile peace, threatened by the remnants of the Empire.'),
	('Rise of the First Order', 'https://lumiere-a.akamaihd.net/v1/images/era8_f83e131b_2508094e.png', 'In secret, the legacy of the Empire transforms into the First Order and strikes a devastating blow against the New Republic. A fledgling Resistance and new generation of heroes are left to stand against a resurrected enemy.'),
	('New Jedi Order', 'https://lumiere-a.akamaihd.net/v1/images/era9_off_99bd88a1.png', NULL);