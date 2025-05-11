export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-200 dark:border-zinc-800 mt-auto z-10">
      <div className="max-w-[75ch] mx-auto w-full py-4 px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>© {new Date().getFullYear()} Justin J Daniel.</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Built with ❤️</span>
        </div>
      </div>
    </footer>
  );
}
