import type { Nullable } from '@swdbapp/types';

export interface Era {
    $id: number;
    name: string;
    description: string;
    logo: URL;
}

export interface EraDetails extends Era {
    titles: Nullable<EraTitle[]>;
}

export interface EraTitle {
    $id: number;
    title: string;
    logo: URL;
}
