import { selectOneByTitle } from '../../controllers';
import type { QueryConfig } from 'pg';

export const selectOneTitleByTitle = (title: string): Promise<QueryConfig> => {
	return selectOneByTitle({ id: title });
};
