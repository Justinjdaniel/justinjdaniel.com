import "server-only";

import { StackServerApp } from "@stackframe/stack";

/**
 * Initializes the StackServerApp with Next.js cookie-based token storage.
 * See: https://stackframe.dev/docs/stack/server-app#tokenstore
 */
export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
});
