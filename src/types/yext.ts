import { ImageType, ComplexImageType } from "@yext/pages-components";

export interface YextResponse<T> {
  meta: {
    uuid: string;
    errors: any[];
  };
  response: T;
}

export interface WebhookPayload {
  // TODO: update this type
  languageProfiles: any[];
  meta: WebhookMeta;
  primaryProfile: Record<string, any>;
  changedFields: ChangedFields;
  entityId: string;
}

interface ChangedFields {
  fieldNames: string[];
  language: string;
}

interface WebhookMeta {
  actor: string;
  accountId: string;
  appSpecificAccountId: string;
  eventType: string;
  uuid: string;
  timestamp: number;
}

interface EntityMeta {
  accountId: string;
  uid: string;
  id: string;
  timestamp: string;
  createdTimestamp: string;
  folderId: string;
  language: string;
  countryCode: string;
  entityType: string;
}

export interface CreateCategoryPageRequest {
  meta: {
    id: string;
  };
  name: string;
  slug: string;
  c_relatedCategories: string[];
  c_relatedLocations: string[];
  primaryPhoto?: ImageType;
  photoGallery?: ComplexImageType[];
  products?: string[];
  services?: string[];
}

export interface CreateEntityRequestResponse {
  meta: {
    id: string;
  };
}

export interface Location extends LocationProfile {
  meta: EntityMeta;
}

export interface LocationProfile {
  photoGallery: Array<{
    image: {
      width: number;
      thumbnails: Array<{
        width: number;
        url: string;
        height: number;
      }>;
      url: string;
      height: number;
    };
    description: string;
  }>;
  address: {
    city: string;
    countryCode: string;
    postalCode: string;
    region: string;
    line1: string;
  };
  cityCoordinate: {
    latitude: number;
    longitude: number;
  };
  addressHidden: boolean;
  mainPhone: string;
  timezone: string;
  description: string;
  timeZoneUtcOffset: string;
  instagramHandle: string;
  emails: string[];
  yextDisplayCoordinate: {
    latitude: number;
    longitude: number;
  };
  yextRoutableCoordinate: {
    latitude: number;
    longitude: number;
  };
  paymentOptions: string[];
  twitterHandle: string;
  logo: {
    image: {
      sourceUrl: string;
      alternateText: string;
      width: number;
      thumbnails: Array<{
        width: number;
        url: string;
        height: number;
      }>;
      url: string;
      height: number;
    };
    description: string;
    details: string;
  };
  neighborhood: string;
  categories: {
    yext: string[];
  };
  geocodedCoordinate: {
    latitude: number;
    longitude: number;
  };
  isoRegionCode: string;
  c_relatedCategories?: string[];
  slug: string;
}

export interface Category {
  meta: EntityMeta;
  primaryPhoto: ImageType;
  slug: string;
  description: string;
  name: string;
  photoGallery?: ComplexImageType[];
  c_feateredProducts?: string[];
  products?: string[];
  services?: string[];
}
