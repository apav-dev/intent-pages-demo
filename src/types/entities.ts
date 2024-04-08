import {
    TemplateProps as InternalTemplateProps,
    TemplateRenderProps as InternalTemplateRenderProps,
  } from "@yext/pages/*";
  import type { ListingType } from "@yext/pages-components";
  import type {
    Address,
    Coordinate,
    CTA,
    Hours,
    Image,
    ComplexImage,
    WebsiteUrl,
  } from "@yext/types";
  import type { Resource } from "i18next";
  
  // TODO: potentially move this to @yext/types
  // Also we should probably move @yext/types into @yext/pages
  // since they're specific to pages streams, not generic kg types
  export interface BaseProfile {
    readonly id: string;
    readonly businessId: number;
    readonly locale: string;
    readonly siteDomain: string;
    readonly siteId: number;
    readonly siteInternalHostname: string;
    readonly uid: number;
    readonly meta: {
      readonly entityType: {
        readonly id: string;
        readonly uid: number;
      };
      readonly locale: string;
    };
    readonly _site: any;
  }
  
  interface PhoneData {
    readonly label: string;
    readonly href: string;
    readonly raw: string;
  }
  
  // TODO: generate these automatically from stream definitions
  export interface LocationProfile extends BaseProfile {
    readonly name: string;
    readonly address: Address;
    readonly yextDisplayCoordinate: Coordinate;
    readonly slug: string;
    readonly hours?: Hours;
    readonly additionalHoursText?: string;
    readonly mainPhone?: string;
    readonly t_mainPhone?: PhoneData;
    readonly fax?: string;
    readonly tollFreePhone?: string;
    readonly mobilePhone?: string;
    readonly ttyPhone?: string;
    readonly localPhone?: string;
    readonly alternatePhone?: string;
    readonly description?: string;
    readonly neighborhood?: string;
    readonly emails?: string[];
    readonly services: string[];
    readonly photoGallery: ComplexImage[];
    readonly googlePlaceId?: string;
    readonly ref_listings?: ListingType[];
    readonly logo?: Image;
    readonly paymentOptions?: string;
    readonly dm_directoryParents?: Array<{ slug: string; name: string }>;
  }
  
  export type TemplateProps<T = Record<string, unknown>> = Omit<
    InternalTemplateProps,
    "document"
  > & {
    document: T;
  };
  export type TemplateRenderProps<T = Record<string, unknown>> = Omit<
    InternalTemplateRenderProps,
    "document"
  > &
    TemplateProps<T> & {
      translations?: Resource;
    };