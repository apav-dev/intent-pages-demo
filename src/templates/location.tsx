import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../index.css";
import { DocumentProvider } from "../hooks/useDocument";
import Banner from "../components/Banner";
import BreadCrumbs from "../components/BreadCrumbs";
import Carousel from "../components/Carousel";
// import Hero from "../components/Hero";
import FAQs from "../components/FAQs";
import FeaturedCategories from "../components/location/FeaturedCategories";
import GoogleMap from "../components/GoogleMap";
import Main from "../components/Main";
import Hero from "../components/location/Hero";

export const config: TemplateConfig = {
  stream: {
    $id: "location",
    fields: [
      "id",
      "name",
      "address",
      "mainPhone",
      "hours",
      "slug",
      "description",
      "neighborhood",
      "photoGallery",
      "services",
      "paymentOptions",
      "yextDisplayCoordinate",
      "c_relatedCategoryPages.slug",
      "c_relatedCategoryPages.c_relatedCategories.name",
      "c_relatedCategoryPages.c_relatedCategories.description",
      "c_relatedCategoryPages.c_relatedCategories.primaryPhoto",
      "c_relatedCategoryPages.c_relatedCategories.products",
      "c_relatedCategoryPages.c_relatedCategories.services",
      "c_relatedCategoryPages.c_relatedCategories.c_promotionTitle",
    ],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ?? document.name;
};

export const transformProps: TransformProps<TemplateRenderProps> = async (
  data
) => {
  // const locationAddress = data.document.address;
  // const neighborhood = data.document.neighborhood;
  // const description = data.document.c_relatedCategories[0].description;
  // const transformedDescription = description.replace(
  //     /\{\{([^}]+)\}\}/g,
  //     (match, key:string) => {
  //       switch (key.trim()) {
  //         case 'address.line1':
  //           return locationAddress.line1;
  //         case 'address.line2':
  //           return locationAddress.line2;
  //         case 'address.city':
  //           return locationAddress.city;
  //         case 'address.region':
  //           return locationAddress.region;
  //         case 'neighborhood':
  //           return neighborhood;
  //         default:
  //             return match;
  //       }
  //     }
  //   );

  return {
    ...data,
    document: {
      ...data.document,
      // transformedDescription: transformedDescription
    },
  };
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const LocationPage: Template<TemplateRenderProps> = (data) => {
  return (
    <>
      <Main data={data} containerClassName="pb-32">
        <DocumentProvider value={data.document}>
          <div className="centered-container">
            <BreadCrumbs />
            <Hero />
          </div>
          <FeaturedCategories />
          <div className="centered-container">
            <FAQs />
            {/* <GoogleMap /> */}
          </div>
        </DocumentProvider>
      </Main>
    </>
  );
};

export default LocationPage;
