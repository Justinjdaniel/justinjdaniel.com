"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { GTM_ID, pageview } from "../../../lib/gtm";

export default function GoogleTagManager() {
  const pathname = usePathname();
  const _searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);

  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return null;
  }

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          title="gtm"
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional, use of dangerouslySetInnerHTML for GTM script
        dangerouslySetInnerHTML={{
          __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer', '${GTM_ID}');
              `,
        }}
      />
    </>
  );
}
