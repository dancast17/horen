"use client";

import { useEffect } from "react";
import { getCookie } from "cookies-next";

const Analytics = () => {
  useEffect(() => {
    const consent = getCookie("consent");

    if (consent === "true") {
      // Carrega GTM dinamicamente
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`;
      document.head.appendChild(script);

      // Cria o dataLayer se não existir
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cookie_consent_given",
      });

      // Sinaliza consentimento para o Consent Mode
      window.dataLayer.push({
        consent: "update",
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        consent: "default",
        ad_storage: "denied",
        analytics_storage: "denied",
      });
    }

    window.addEventListener("updateGTMConsent", () => {
        if (!window.dataLayer) return;
      
        window.dataLayer.push({
          consent: "update",
          ad_storage: "granted",
          analytics_storage: "granted",
        });
      
        window.dataLayer.push({ event: "cookie_consent_given" });
      });
      
  }, []);

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
};

export default Analytics;
