import type { People } from '../models';

export type ForceAlignment = 'sith' | 'jedi';
export const FORCE_ALIGNMENTS: Record<string, ForceAlignment> = Object.freeze({
	SITH: 'sith' as ForceAlignment,
	JEDI: 'jedi' as ForceAlignment,
});

const mapOfSiths: Record<string, ForceAlignment> = {
	darthvader: FORCE_ALIGNMENTS.SITH,
	palpatine: FORCE_ALIGNMENTS.SITH,
	bobafett: FORCE_ALIGNMENTS.SITH,
	sebulba: FORCE_ALIGNMENTS.SITH,
	dooku: FORCE_ALIGNMENTS.SITH,
	darthmaul: FORCE_ALIGNMENTS.SITH,
};

const fixName = (name: string): string => name.toLowerCase().replace(/\s+/g, '').trim();

export const mapPeopleAlignment = ({ name }: People): ForceAlignment => {
	return mapOfSiths[fixName(name)] || FORCE_ALIGNMENTS.JEDI;
};

export const isSith = ({ name }: People): boolean => {
	return mapOfSiths[fixName(name)] === FORCE_ALIGNMENTS.SITH;
};

export const isJedi = ({ name }: People): boolean => !isSith({ name } as People);
