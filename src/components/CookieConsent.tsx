"use client";

import { setCookie, hasCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { consent } from "nextjs-google-analytics";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (!hasCookie("consent")) {
      setShowConsent(true);
    }
  }, []);

  const acceptConsent = () => {
    setShowConsent(false);
    setCookie("consent", "true");

    consent({
      arg: "update",
      params: {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      },
    });
  };

  const declineConsent = () => {
    setShowConsent(false);
    setCookie("consent", "false");

    consent({
      arg: "default",
      params: {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    });
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/90 border border-[#a72420] text-white text-sm sm:text-base px-6 py-4 rounded-xl shadow-lg z-50 w-[90vw] max-w-md flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur">
      <p className="text-white font-light leading-snug text-center sm:text-left">
        We use cookies to improve your experience. By continuing, you agree to the use of these cookies.
      </p>
      <div className="flex gap-2">
        <button
          onClick={acceptConsent}
          className="bg-[#555555] text-white font-semibold text-xs sm:text-sm px-4 py-1.5 rounded hover:bg-[#911e1b] transition-colors"
        >
          Accept
        </button>
        <button
          onClick={declineConsent}
          className="border border-white text-white font-semibold text-xs sm:text-sm px-4 py-1.5 rounded hover:bg-white hover:text-black transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
