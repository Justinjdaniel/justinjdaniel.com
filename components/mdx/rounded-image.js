import Image from "next/image";

/**
 * Rounded Image component
 * @description This component is used to display an image with rounded corners and a hover effect.
 * It uses the Next.js Image component for optimized image loading.
 * The image will scale slightly when hovered over, and the view transition name is set based on the alt text of the image.
 * @param {*} props
 * @returns {JSX.Element} The Rounded Image component.
 */
export default function RoundedImage(props) {
  return (
    <div
      className="my-6 transition-all duration-200 ease-in-out hover:scale-[1.02]"
      style={{
        viewTransitionName: `image-${props.alt?.toLowerCase().replace(/\s+/g, "-")}`,
      }}
    >
      <Image
        alt={props.alt}
        className="rounded-lg max-w-full h-auto"
        {...props}
        width={props.width || 1200}
        height={props.height || 630}
      />
    </div>
  );
}
