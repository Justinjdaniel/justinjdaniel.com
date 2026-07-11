function getTimeToRead(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default function TimeToRead({ content }) {
  if (!content) return null;
  const timeToRead = getTimeToRead(content);
  return (
    <span className="text-xs text-zinc-600 dark:text-zinc-400">
      {timeToRead}
    </span>
  );
}
