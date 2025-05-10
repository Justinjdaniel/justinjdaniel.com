export default function GridBackground({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`
        fixed left-0 top-0 w-screen h-screen pointer-events-none z-0
        [--grid-color:rgba(0,0,0,0.10)]
        dark:[--grid-color:rgba(255,255,255,0.10)]
        bg-[linear-gradient(to_right,transparent_0_24.5px,var(--grid-color)_24.5px_25px,transparent_25.5px_50px),linear-gradient(to_bottom,transparent_0_24.5px,var(--grid-color)_24.5px_25px,transparent_25.5px_50px)]
        bg-[length:50px_50px]
        [mask-image:linear-gradient(135deg,white_0%,white_10%,transparent_50%,transparent_100%)]
        ${className}
      `}
      style={
        {
          // Optional: If you want to be *absolutely* sure the mask is viewport-based,
          // you can use this instead (though the default works fine for fixed elements):
          // maskImage: 'linear-gradient(135deg, white 0vw, white 10vw, transparent 50vw, transparent 100vw)'
        }
      }
    />
  );
}
