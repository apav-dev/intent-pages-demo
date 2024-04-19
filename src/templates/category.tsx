import {
    GetHeadConfig,
    GetPath,
    GetRedirects,
    HeadConfig,
    Template,
    TemplateConfig,
    TemplateProps,
    TemplateRenderProps,
    TransformProps
  } from "@yext/pages";
  import * as React from "react";
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
    const locationAddress = data.document.c_relatedLocations[0].address;
    const neighborhood = data.document.c_relatedLocations[0].neighborhood;
    const description = data.document.c_relatedCategories[0].description;
    const transformedDescription = description.replace(
        /\{\{([^}]+)\}\}/g,
        (match, key:string) => {
          switch (key.trim()) {
            case 'address.line1':
              return locationAddress.line1;
            case 'address.line2':
              return locationAddress.line2;
            case 'address.city':
              return locationAddress.city;
            case 'address.region':
              return locationAddress.region;
            case 'neighborhood':
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
            transformedDescription: transformedDescription
        }
    }
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
            <main className="min-h-screen">
              {/* <Banner /> */}
              <div className="centered-container">
                <BreadCrumbs />
                <Hero />
                <ProductsAndServices />
              </div>
            </main>
          </DocumentProvider>
        </Main>
      </>
    );
  };
  
  export default LocationPage;
  