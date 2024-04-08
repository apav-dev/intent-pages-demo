export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface Dm_directoryChildren {
	name?: string,
	slug?: string,
	address?: Address,
}

export interface Index {
	id: string,
	name: string,
	slug: string,
	dm_directoryChildren: Dm_directoryChildren[],
}

export interface Location {
	id: string,
	name: string,
	slug: string,
}
