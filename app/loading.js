export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
 
  // This loading component uses an animated SVG spinner with accessibility support.
  return (
    <div className="flex items-center justify-center h-screen bg-background/60 backdrop-blur-sm">
      <output
        className="inline-flex items-center justify-center rounded-full p-4 bg-white/80 shadow-lg"
        aria-live="polite"
      >
        <svg
          className="w-10 h-10 text-primary animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </output>
    </div>
  );
}
