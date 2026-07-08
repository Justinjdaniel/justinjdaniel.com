/**
 * CustomList component
 * @description This component is used to display a list (ordered or unordered) with custom styles.
 * It applies specific styles to the list and its items, including margin, padding, and text color.
 * @param {ReactNode} children - The content to display inside the list.
 * @param {boolean} ordered - If true, renders an ordered list (ol), otherwise renders an unordered list (ul).
 * @returns {JSX.Element} The CustomList component.
 * @example
 * <CustomList ordered={true}>
 *   <li>Item 1</li>
 *   <li>Item 2</li>
 *   <li>Item 3</li>
 * </CustomList>
 */
export default function CustomList({ children, ordered }) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag
      className={`
        my-6 ml-6 list-outside
        ${ordered ? "list-decimal" : "list-disc"}
        [&>li]:mt-2
        [&>li]:leading-relaxed
        [&>li]:text-zinc-700 dark:[&>li]:text-zinc-300
        [&>li]:marker:text-zinc-500 dark:[&>li]:marker:text-zinc-400
        [&>li>p]:my-0
        [&>li>p:first-child]:mt-0
        [&>li>p:last-child]:mb-0
      `}
    >
      {children}
    </ListTag>
  );
}
