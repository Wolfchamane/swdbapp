DROP TABLE IF EXISTS swdb_pro."titles";

CREATE TABLE swdb_pro."titles"
(
	"id"             serial              NOT NULL,
	"name"           VARCHAR(512) UNIQUE NOT NULL,
	"logo"           VARCHAR(512),
	"type"           VARCHAR(16),
	"poster"         VARCHAR(512),
	"rating"         VARCHAR(16),
	"duration"       VARCHAR(13),
	"release_date"   VARCHAR(32),
	"genre"          VARCHAR(128),
	"resume"         TEXT,
	"director"       VARCHAR(128),
	"music_director" VARCHAR(128),
	"producers"      VARCHAR(512),
	"actors"         VARCHAR(1024),
	"plot"           TEXT,
	"opening_crawl"  TEXT
);

ALTER TABLE swdb_pro."titles"
	ADD CONSTRAINT "pk_titles" PRIMARY KEY ("id", "name");


INSERT INTO swdb_pro."titles" ("name", "logo", "type", "poster", "rating", "duration", "release_date", "genre", "resume", "director", "music_director", "producers", "actors", "plot", "opening_crawl") VALUES
	('The High Republic', 'images/titles/logos/the-high-republic.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Young Jedi Adventures', 'images/titles/logos/young-jedi-adventures.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('The Acolyte', 'images/titles/logos/the-acolyte.png', 'series', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars Episode I: The Phantom Menace', 'images/titles/logos/the-phantom-menace.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Tales of the Jedi', 'images/titles/logos/tales-of-the-jedi.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars Episode II: Attack of the Clones', 'images/titles/logos/attack-of-the-clones.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: The Clone Wars', 'images/titles/logos/the-clone-wars.png', 'series', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars Episode III: Revenge of the Sith', 'images/titles/logos/revenge-of-the-sith.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Tales of the Empire', 'images/titles/logos/tales-of-the-empire.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: The Bad Batch', 'images/titles/logos/the-bad-batch.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Jedi Fallen Order', 'images/titles/logos/jedi-fallen-order.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Solo', 'images/titles/logos/solo-a-star-wars-story.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Obi Wan Kenobi', 'images/titles/logos/obi-wan-kenobi.png', 'series', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Jedi Survivor', 'images/titles/logos/jedi-survivor.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Andor', 'images/titles/logos/andor.png', 'series', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Rebels', 'images/titles/logos/rebels.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Vader Immortal Episode I', 'images/titles/logos/vader-immortal-episode-1.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Rogue One', 'images/titles/logos/rogue-one.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars Episode IV: A New Hope', 'images/titles/logos/a-new-hope.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars Episode V: The Empire Strikes Back', 'images/titles/logos/the-empire-strikes-back.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Outlaws', 'images/titles/logos/star-wars-outlaws.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars Episode VI: Return of the Jedi', 'images/titles/logos/return-of-the-jedi.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Battlefront II', 'images/titles/logos/battle-front-ii.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Squadrons', 'images/titles/logos/squadrons.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('The Mandalorian', 'images/titles/logos/the-mandalorian.png', 'series', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('The Book of Boba Fett', 'images/titles/logos/book-of-boba-fett.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Ahsoka', 'images/titles/logos/ahsoka.png', 'series', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Skeleton Crew', 'images/titles/logos/skeleton-crew.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Resistance', 'images/titles/logos/resistance.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars Episode VII: The Force Awakens', 'images/titles/logos/the-force-awakens.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars Episode VIII: The Last Jedi', 'images/titles/logos/the-last-jedi.png', 'films', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars: Tales from the galaxy''s edge', 'images/titles/logos/tales-from-galaxy-edge.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('Star Wars Episode IX: The Rise of Skywalker', 'images/titles/logos/the-rise-of-skywalker.png', 'films', 'images/titles/posters/the-rise-of-skywalker.jpeg', 'PG-13', '8520000', '2019-12-18T00:00:00.000Z', 'Action, Adventure, Science Fiction', 'Lucasfilm and director J.J. Abrams join forces once more to take viewers on an epic journey to a galaxy far, far away with Star Wars: The Rise of Skywalker, the riveting conclusion of the landmark Skywalker saga, in which new legends will be born and the final battle for freedom is yet to come.', 'J.J. Abrams', 'John Williams', 'J.J. Abrams, Kathleen Kennedy, Michelle Rejwan', 'Carrie Fisher, Mark Hamill, Adam Driver, Daisy Ridley, John Boyega, Oscar Isaac, Anthony Daniels, Naomi Ackie, Domhnall Gleeson, Richard E. Grant, Lupita Nyong''o, Keri Russell, Joonas Suotamo, Kelly Marie Tran, Ian McDiarmid, Billy Dee Williams', '<p>One year after the Battle of Crait, Kylo Ren obtains a Sith wayfinder on the planet Mustafar that leads him to the hidden planet Exegol. There, he finds a resurrected Emperor Palpatine, who reveals himself as the power behind Snoke and the First Order. Palpatine unveils a Sith armada of Star Destroyers and offers it to Kylo if he finds and kills Rey, who is continuing her Jedi training under Resistance leader Leia Organa. Poe Dameron and Finn deliver intelligence from a spy in the First Order that Palpatine is on Exegol; Rey reads in Luke Skywalker''s notes that a Sith wayfinder can lead them there. Rey, Finn, Poe, Chewbacca, BB-8, and C-3PO depart in the Millennium Falcon to the desert planet Pasaana, where a clue to a wayfinder is hidden.</p><p>Kylo initiates a Force bond with Rey to discover her location. He travels to Pasaana with his warrior subordinates, the Knights of Ren. With Lando Calrissian''s help, Rey and her friends find the clue—a dagger inscribed with Sith text, which C-3PO''s programming forbids him from interpreting—and the remains of a Sith assassin named Ochi and his ship, which Rey recognizes. Rey senses Kylo nearby and faces him while the First Order captures the Falcon, Chewbacca, and the dagger. Attempting to save Chewbacca, Rey accidentally destroys a First Order transport with Force lightning. Believing Chewbacca is dead, the group escapes on Ochi''s ship.</p><p>They travel to Kijimi, where the droidsmith Babu Frik extracts the Sith text from C-3PO''s memory, revealing the wayfinder''s coordinates. Rey senses Chewbacca is alive aboard a First Order Star Destroyer, so the group stages a rescue with the smuggler Zorii''s help. Rey recovers the dagger and experiences repressed memories of her parents. She duels Kylo, who reveals that Palpatine is her paternal grandfather. Foreseeing her power, Palpatine had ordered Ochi to find the young Rey, but her parents hid her on Jakku, prompting Ochi to kill them with the dagger. To spite Kylo, General Hux saves Poe, Finn, and Chewbacca from execution, revealing himself as the spy. Rey and her friends escape, while Hux is executed by Allegiant General Pryde. The group flies the Falcon to the wayfinder''s coordinates on a moon in the Endor system.</p><p>There, they find renegade stormtroopers led by Jannah, whom they recruit to the Resistance. Rey retrieves the wayfinder from the wreckage of the second Death Star, but she is met by Kylo, who destroys the wayfinder and duels her. In a dying act, Leia distracts Kylo through the Force, and Rey impales him. Sensing Leia''s death and overcome by guilt, Rey heals Kylo and takes his TIE fighter to exile herself on Ahch-To. Meanwhile, Kylo converses with a memory of his father, Han Solo. He discards his lightsaber and reclaims his identity as Ben Solo. Palpatine deploys the Sith fleet to draw Rey out and sends a Sith Star Destroyer to destroy Kijimi. On Ahch-To, Luke''s Force spirit encourages Rey to face Palpatine and gives her Leia''s lightsaber. Rey leaves for Exegol in Luke''s X-wing fighter, using the wayfinder from Ben''s ship.</p><p>Rey transmits her coordinates to R2-D2, allowing the Resistance, now led by Poe and Finn, to follow her to Exegol. There, she confronts Palpatine. Debilitated, he demands that she kill him in anger so his spirit can possess her body. The Resistance attacks the Sith fleet, while Ben overpowers the Knights of Ren and joins Rey. Palpatine senses their power as "a dyad in the Force" and drains it to rejuvenate his body. Lando arrives with reinforcements from across the galaxy, including Babu and Zorii. Palpatine incapacitates Ben and attacks the Resistance fleet with Force lightning. Weakened, Rey hears the voices of past Jedi, who give her strength. Palpatine attacks her with lightning, but Rey deflects it using Luke and Leia''s lightsabers, destroying him before dying herself. Ben uses the Force to revive Rey, sacrificing himself, and they kiss before he dies. The Resistance destroys the remaining Sith forces, while people across the galaxy rise up against the First Order.</p><p>The Resistance celebrates their victory. Rey visits Luke''s abandoned homestead on Tatooine and buries Luke and Leia''s lightsabers. A passerby asks her name; seeing Luke and Leia''s Force spirits nearby, she responds, &quot;Rey Skywalker&quot;.</p>', '<p>Episode IX</p><h1>The Rise of Skywalker</h1><p>The dead speak! The galaxy has heard a mysterious broadcast, a threat of REVENGE in the sinister voice of the late EMPEROR PALPATINE</p><p>GENERAL LEIA ORGANA dispatches secret agents to gather intelligence, while REY, the last hope of the Jedi, trains for battle against the diabolical FIRST ORDER.</p><p>Meanwhile, Supreme Leader KYLO REN rages in search of the phantom Emperor, determined to destroy any threat to his power...</p>');