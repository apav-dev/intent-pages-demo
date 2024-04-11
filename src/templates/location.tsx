import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import "../index.css";
import { DocumentProvider } from "../hooks/useDocument";

import Banner from "../components/Banner";
import BreadCrumbs from "../components/BreadCrumbs";
import Carousel from "../components/Carousel";
// import Hero from "../components/Hero";
import FAQs from "../components/FAQs";
import Hours from "../components/Hours";
import Main from "../components/Main";
import NAP from "../components/NAP";

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
              <div className="space-y-12 lg:flex">
                <NAP />
                <Hours title="Store Hours" />
              </div>
              <FAQs />
              <Carousel />
            </div>
          </main>
        </DocumentProvider>
      </Main>
    </>
  );
};

export default LocationPage;
