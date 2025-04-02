export interface SelectAllInput {
	limit?: string;
	offset?: string;
	orderBy?: string;
	orderDir?: string;
	searchBy?: string;
	search?: string;
}

export interface SelectOneInput {
	id: string;
}
