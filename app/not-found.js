export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        {/* Doodle Magnifying Glass Icon */}
        <div className="mb-6 flex justify-center items-center">
          <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="block w-14 h-14 text-indigo-500"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
        </div>
        <h1 className="font-bold text-3xl md:text-4xl mb-4 text-zinc-900 dark:text-zinc-100 tracking-tight">
          404 - Page Not Found
        </h1>
        <p className="mb-6 text-zinc-700 dark:text-zinc-300 text-base md:text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
          <br />
          If you expected to see something here, please{" "}
          <a
            href="mailto:justinjdaniel@duck.com"
            className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800"
          >
            let me know
          </a>
          .
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-all"
        >
          Go back home
        </a>
      </div>
    </section>
  );
}
