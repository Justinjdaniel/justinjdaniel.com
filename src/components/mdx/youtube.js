/**
 * YouTube component for embedding YouTube videos.
 * @description This component is used to embed YouTube videos in a responsive container.
 * It uses an iframe to display the video and ensures that the video maintains its aspect ratio.
 * @param {string} id - The YouTube video ID to embed.
 * @returns {JSX.Element} The YouTube component.
 * @example
 * <YouTube id="dQw4w9WgXcQ" />
 */
export default function YouTube({ id }) {
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        title="YouTube Video"
      />
    </div>
  );
}
