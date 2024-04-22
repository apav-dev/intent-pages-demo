import type { ReactNode } from "react";
import Header from "./Header";
// import Footer from "./Footer";
import { AnalyticsProvider } from "@yext/pages-components";
import { TemplateDataProvider } from "../common/useTemplateData";
import type { TemplateRenderProps, BaseProfile } from "../types/entities";
import config from "../config";
import { ConfigurationProvider } from "@yext/sites-react-components";
import { cn } from "../lib/utils";
import {
  provideHeadless,
  Environment,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";

interface MainProps {
  data: TemplateRenderProps<BaseProfile>;
  children?: ReactNode;
  containerClassName?: string;
}

const searcher = provideHeadless({
  apiKey: YEXT_PUBLIC_SEARCH_API_KEY,
  experienceKey: "marketing-site",
  locale: "en",
  environment: Environment.PROD,
  verticalKey: "locations",
});

const Main = (props: MainProps) => {
  return (
    <ConfigurationProvider value={config}>
      <AnalyticsProvider templateData={props.data} requireOptIn={false}>
        <SearchHeadlessProvider searcher={searcher}>
          <MainInternal {...props} />
        </SearchHeadlessProvider>
      </AnalyticsProvider>
    </ConfigurationProvider>
  );
};

const MainInternal = ({ data, children, containerClassName }: MainProps) => {
  return (
    <TemplateDataProvider value={data}>
      <Header />
      <main className={cn("min-h-screen", containerClassName)}>
        {children}
        {/* <Footer /> */}
      </main>
    </TemplateDataProvider>
  );
};

export default Main;
