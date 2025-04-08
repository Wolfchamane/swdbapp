export type TitleType = 'films' | 'series' | 'game-apps';
export const TITLE_TYPES: Record<string, TitleType> = {
    FILMS: 'films',
    SERIES: 'series',
    GAME_APPS: 'game-apps',
};

export interface Title {
    $id: number;
    title: string;
    logo: URL;
}

export interface TitleDetails extends Title {
    type: TitleType;
    poster: URL;
    rating: string;
    duration: number;
    releaseDate: Date;
    genre: string[];
    resume: string;
    director: string;
    musicDirector: string;
    producers: string[];
    actors: string[];
    plot: string;
    openingCrawl: string;
}
