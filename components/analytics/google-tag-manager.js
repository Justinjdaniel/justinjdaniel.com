import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID } from "@/lib/gtm";

export default function GTM() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && process.env.NODE_ENV !== "production") {
    return null;
  }

  return <GoogleTagManager gtmId={GTM_ID} />;
}
