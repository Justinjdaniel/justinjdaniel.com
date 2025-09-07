"use client";
// Microsoft Clarity Analytics Script
import { useEffect } from "react";

// Loads Microsoft Clarity analytics script in production
export default function MicrosoftClarity() {
  useEffect(() => {
    // Only run in production environment
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return;
    // Ensure window is available (client-side only)
    if (typeof window === "undefined") return;
    // Prevent duplicate script injection
    if (window.clarity) return;

    const clarityProjectId =
      process.env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID || "hcvetn2uj4";

    // Inject Clarity script
    function loadClarityScript(projectId) {
      window.clarity =
        window.clarity ||
        (() => {
          // Assign clarity.q before pushing arguments
          if (!window.clarity.q) {
            window.clarity.q = [];
          }
          window.clarity.q.push(arguments);
        });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${projectId}`;
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    loadClarityScript(clarityProjectId);
  }, []);

  return null;
}
