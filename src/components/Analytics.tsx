"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Load GTM script dynamically
    const loadGTM = () => {
      const script = document.createElement("script");
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');
      `;
      document.body.appendChild(script);
    };

    loadGTM();

    // gtag fallback definition
    const gtag = (...args: Record<string, unknown>[]) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(...args);
      };

    const consent = getCookie("consent");
    if (consent === "true") {
        gtag({
            consent: "update",
            ad_storage: "granted",
            analytics_storage: "granted",
            functionality_storage: "granted",
            personalization_storage: "granted",
            security_storage: "granted",
          });          
    } else {
        gtag({
            consent: "default",
            ad_storage: "denied",
            analytics_storage: "denied",
            functionality_storage: "denied",
            personalization_storage: "denied",
            security_storage: "denied",
          });
          
    }

    // Listen for consent updates (triggered from CookieConsent.tsx)
    window.addEventListener("updateGTMConsent", () => {
        gtag({
            consent: "update",
            ad_storage: "granted",
            analytics_storage: "granted",
            functionality_storage: "granted",
            personalization_storage: "granted",
            security_storage: "granted",
          });          
      window.dataLayer.push({ event: "cookie_consent_given" });
    });
  }, [pathname, searchParams]);

  // Avoid running in non-production
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return null;

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
}
