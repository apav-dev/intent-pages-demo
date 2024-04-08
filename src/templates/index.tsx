import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import Favicon from "/yext-favicon.ico";
import Banner from "../components/Banner";
import Main from "../components/Main";
import { DocumentProvider } from "../hooks/useDocument";
import DirectoryGrid from "../components/DirectoryGrid";

export const config: TemplateConfig = {
  stream: {
    $id: "index",
    fields: [
      "id",
      "name",
      "slug",
      "photoGallery",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.address",
      "dm_directoryChildren.neighborhood",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.photoGallery",
    ],
    filter: {
      savedFilterIds: ["dm_location-directory"],
    },
    localization: {
      locales: ["en"],
    },
  },
};


export const transformProps: TransformProps<TemplateRenderProps> = async (
  data
) => {
  return data
};


export const getPath: GetPath<TemplateRenderProps> = () => {
  return `index.html`;
};


export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: "Yext Electronics Home Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      }
    ],
  };
};



const Index: Template<TemplateRenderProps> = (data) => {

  return (
    <>
      <Main data={data}>
        <DocumentProvider value={data.document}>
          <main>
            <Banner />
            <DirectoryGrid />
          </main>
        </DocumentProvider>
      </Main>
    </>
  );
};

export default Index;
