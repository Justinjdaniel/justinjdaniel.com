import Script from "next/script";
import { GTM_ID } from "../../../lib/gtm";

export default function GoogleTagManager() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      />
      {/* noscript fallback for GTM, to be rendered in <body> for non-JS users */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="gtm"
        />
      </noscript>
    </>
  );
}
