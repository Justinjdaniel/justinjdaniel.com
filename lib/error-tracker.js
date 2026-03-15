let errorLogs = [];

export function initializeErrorTracking() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      error: event.error?.message || event.message || "Unknown error",
      stack: event.error?.stack || "No stack trace available",
      userAgent: navigator.userAgent,
      url: window.location.href,
      route: window.location.pathname,
      buildEnv: process.env.NODE_ENV || "unknown",
    };

    errorLogs.push(errorInfo);

    // Log removeChild errors with detailed context
    if (
      errorInfo.error.includes("removeChild") ||
      errorInfo.error.includes("NotFoundError")
    ) {
      console.group("🚨 REMOVE_CHILD ERROR DETECTED");
      console.error("Error Details:", errorInfo);
      console.error("DOM State:", document.body.children.length, "children");
      console.error(
        "React Roots:",
        document.querySelectorAll("[data-reactroot]").length,
      );
      console.groupEnd();
    }
  });

  // Add to window for production debugging
  window.animaneraErrorTracker = {
    getLogs: () => errorLogs,
    clearLogs: () => {
      errorLogs = [];
    },
    downloadLogs: () => {
      const dataStr = JSON.stringify(errorLogs, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      const link = document.createElement("a");
      link.setAttribute("href", dataUri);
      link.setAttribute("download", `error-logs-${Date.now()}.json`);
      link.click();
    },
  };
}
