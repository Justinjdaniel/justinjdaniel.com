/**
 * CustomLink component
 * @description This component is used to display a link with custom styles.
 * @param {object} props - Additional props to pass to the link element.
 * @returns {JSX.Element} The CustomLink component.
 * @example
 * <CustomLink href="/about">About</CustomLink>
 */
export default function CustomLink(props) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className="
          font-medium text-indigo-500 hover:text-indigo-600 
          transition-colors relative
          after:absolute after:bottom-0 after:left-0 
          after:w-0 after:h-px after:bg-current
          after:transition-all after:duration-200
          hover:after:w-full
        "
        style={{ viewTransitionName: `link-${href.replace(/\//g, "")}` }}
        {...props}
      >
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a
        {...props}
        className="
          anchor hover:text-indigo-500 transition-colors
          relative after:absolute after:bottom-0 after:left-0 
          after:w-0 after:h-px after:bg-current
          after:transition-all after:duration-200
          hover:after:w-full
        "
      />
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="
        font-medium text-indigo-500 hover:text-indigo-600 
        transition-colors relative
        after:absolute after:bottom-0 after:left-0 
        after:w-0 after:h-px after:bg-current
        after:transition-all after:duration-200
        hover:after:w-full
      "
      {...props}
    />
  );
}
