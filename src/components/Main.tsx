import type { ReactNode } from "react";
import Header from "./Header";
// import Footer from "./Footer";
import { AnalyticsProvider, AnalyticsScopeProvider } from "@yext/pages-components";
import { TemplateDataProvider } from "../common/useTemplateData";
import type { TemplateRenderProps, BaseProfile } from "../types/entities";
import { TemplateProps } from "@yext/pages";
import { useDocument } from "../hooks/useDocument";
import config from "../config";
import { ConfigurationProvider } from "@yext/sites-react-components";

interface MainProps {
  data: TemplateRenderProps<BaseProfile>;
  children?: ReactNode;
}

const Main = (props: MainProps) => {
  return (
    <ConfigurationProvider value={config}>
      <AnalyticsProvider templateData={props.data} requireOptIn={false}>
        <MainInternal {...props} />
      </AnalyticsProvider>
    </ConfigurationProvider>
  );
};

const MainInternal = (props: MainProps) => {
  const { children } = props;

  // Create the global window.enableYextAnalytics function for clients that need to get user consent
  // If consent is not required, set requireOptIn on AnalyticsProvider above to false.
  // useExposeEnableYAFunction();

  return (
    <TemplateDataProvider value={props.data}>
      <Header />
      {children}
      {/* <Footer /> */}
    </TemplateDataProvider>
  );
};

export default Main;