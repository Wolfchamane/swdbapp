import type { Film } from '../types';
import data from './data';

export const listExtendedFilmsByItem = (item: string): Film[] => {
	const films: Film[] = [];
	data.filter(input => input.items.includes(item)).forEach(({ title, release_date, episode_id }) => {
		films.push({
			$id: `ext-film-${Number(films.length + 1)}`,
			title,
			image: `episode-${episode_id}`,
			releaseDate: new Date(Date.parse(release_date)),
			episodeId: episode_id,
			openingCrawl: '',
			director: '',
			producer: '',
			characters: [],
			vehicles: [],
			species: [],
			starships: [],
			planets: [],
			created: new Date(),
			edited: new Date(),
			url: null,
		});
	});

	return films;
};
