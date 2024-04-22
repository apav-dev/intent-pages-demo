import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import Favicon from "/yext-favicon.ico";
import Main from "../components/Main";

import Locator from "../components/search/Locator";

export const config: TemplateConfig = {
  stream: {
    $id: "location-search",
    fields: ["id", "name", "slug"],
    filter: {
      entityIds: ["location-search"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ?? document.name;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Find a Store",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
    ],
  };
};

const Index: Template<TemplateRenderProps> = (data) => {
  return (
    <>
      <Main data={data}>
        <Locator />
      </Main>
    </>
  );
};

export default Index;
