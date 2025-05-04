"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

const GaProvider = () => {
  return <GoogleAnalytics trackPageViews />;
};

export default GaProvider;
