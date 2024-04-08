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
// import Hero from "../components/Hero";
import Main from "../components/Main";

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


export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
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


const EntityPage: Template<TemplateRenderProps> = (data) => {

  return (
    <>
      <Main data={data}>
        <DocumentProvider value={data.document}>
          <main>
            {/* <Banner /> */}
            <div className="centered-container">
              <BreadCrumbs />
              {/* <Hero /> */}
            </div>
          </main>
        </DocumentProvider>
      </Main>
    </>
  );
};

export default EntityPage;
