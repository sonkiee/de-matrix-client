export default function StatusBadge({
  status,
}: {
  status: "active" | "inactive" | "pending" | string;
}) {
  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700",
    // Add more status styles as needed
  };

  const styles =
    statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex rounded-full ${styles} px-2 py-1 text-xs font-medium`}
    >
      {status}
    </span>
  );
}
