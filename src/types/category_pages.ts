export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface CTAs {
	title?: string,
	link?: string,
}

export interface C_fAQs {
	question?: string,
	answer?: any,
	cTAs?: CTAs[],
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_categoryPage {
	primaryPhoto?: ComplexImage,
	slug?: string,
	description?: string,
	name: string,
	c_fAQs?: C_fAQs,
	c_featuredProducts?: EntityReference[],
	c_publish?: boolean,
	c_relatedCategories?: EntityReference[],
	c_relatedLocations?: EntityReference[],
	photoGallery?: ComplexImage[],
	products?: string[],
	services?: string[],
	id: string,
}
