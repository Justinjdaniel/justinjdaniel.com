/**
 * Alert Component
 * @description This component is used to display an alert message with different styles based on the type of alert.
 * It supports four types of alerts: info, warning, danger, and success.
 * @param {string} type - The type of alert to display. Can be "info", "warning", "danger", or "success".
 * @param {ReactNode} children - The content to display inside the alert.
 * @returns {JSX.Element} The Alert component.
 * @example
 * <Alert type="info">This is an info alert.</Alert>
 */
export default function Alert({ type = "info", children }) {
  const colors = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    danger: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
  };
  return (
    <div className={`border-l-4 p-4 my-6 rounded ${colors[type]}`}>
      {children}
    </div>
  );
}
