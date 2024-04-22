import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../index.css";
import { DocumentProvider } from "../hooks/useDocument";

import BreadCrumbs from "../components/BreadCrumbs";
import Hero from "../components/category/Hero";
import Main from "../components/Main";
import ProductsAndServices from "../components/category/ProductsAndServices";

export const config: TemplateConfig = {
  stream: {
    $id: "category-pages",
    fields: [
      "id",
      "name",
      "slug",
      "description",
      "c_relatedLocations.name",
      "c_relatedLocations.address",
      "c_relatedLocations.mainPhone",
      "c_relatedLocations.slug",
      "c_relatedLocations.neighborhood",
      "c_relatedCategories.name",
      "c_relatedCategories.description",
      "c_relatedCategories.primaryPhoto",
      "c_relatedCategories.photoGallery",
      "c_relatedCategories.products",
      "c_relatedCategories.services",
      "c_relatedCategories.c_featuredProducts.name",
      "c_relatedCategories.c_featuredProducts.richTextDescriptionV2",
      "c_relatedCategories.c_featuredProducts.color",
      "c_relatedCategories.c_featuredProducts.brand",
      "c_relatedCategories.c_featuredProducts.price",
      "c_relatedCategories.c_featuredProducts.primaryPhoto",
    ],
    filter: {
      savedFilterIds: ["1383283189"],
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
  const location = data.document.c_relatedLocations[0];
  const { address, neighborhood, description } = location;

  const transformedDescription = description.replace(
    /\{\{([^}]+)\}\}/g,
    (match: string, key: string) => {
      switch (key.trim()) {
        case "address.line1":
          return address.line1;
        case "address.line2":
          return address.line2;
        case "address.city":
          return address.city;
        case "address.region":
          return address.region;
        case "neighborhood":
          return neighborhood;
        default:
          return match;
      }
    }
  );

  return {
    ...data,
    document: {
      ...data.document,
      transformedDescription: transformedDescription,
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
      <Main data={data}>
        <DocumentProvider value={data.document}>
          {/* <Banner /> */}
          <div className="centered-container">
            <BreadCrumbs />
            <Hero />
            <ProductsAndServices />
          </div>
        </DocumentProvider>
      </Main>
    </>
  );
};

export default LocationPage;
