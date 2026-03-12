// OrderItem.tsx
type OrderStatus = "Delivered" | "Shipped" | "Processing" | "Cancelled";

type OrderItemProps = {
  status: OrderStatus;
  date: string;
  orderNumber: string;
  title: string;
  total: string;
  itemCount: number;
  imageUrl: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

const statusStyles: Record<
  OrderStatus,
  { badge: string; primaryLabel: string; primaryClass: string; icon?: string }
> = {
  Delivered: {
    badge:
      "text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400",
    primaryLabel: "View Details",
    primaryClass:
      "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90",
    icon: "chevron_right",
  },
  Shipped: {
    badge: "text-primary bg-primary/10",
    primaryLabel: "Track Order",
    primaryClass:
      "bg-slate-900 text-white shadow-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900",
    icon: "local_shipping",
  },
  Processing: {
    badge:
      "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400",
    primaryLabel: "Manage Order",
    primaryClass:
      "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
  },
  Cancelled: {
    badge: "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400",
    primaryLabel: "View Details",
    primaryClass:
      "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
  },
};

export default function OrderItem(props: OrderItemProps) {
  const {
    status,
    date,
    orderNumber,
    title,
    total,
    itemCount,
    imageUrl,
    onPrimaryAction,
    onSecondaryAction,
  } = props;

  const cfg = statusStyles[status];

  const secondary =
    status === "Delivered"
      ? { label: "Buy Again", variant: "outline" as const }
      : status === "Shipped"
        ? { label: "Invoice", variant: "outline" as const }
        : status === "Processing"
          ? { label: "Cancel Order", variant: "link" as const }
          : null;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
          <img
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            alt={title}
            src={imageUrl}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-xs uppercase tracking-wider",
                    cfg.badge,
                  ].join(" ")}
                >
                  {status}
                </span>
                <span className="text-sm text-slate-400">{date}</span>
              </div>

              <h3 className="mt-1 ml-1.5 font-bold text-slate-900 dark:text-white">
                {orderNumber}
              </h3>
              <p className="text-sm ml-1.5 text-slate-500">{title}</p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {total}
              </p>
              <p className="text-xs text-slate-400">
                {itemCount} {itemCount === 1 ? "Item" : "Items"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={onPrimaryAction}
              className={[
                "flex items-center gap-2 rounded-lg px-5 py-2 text-sm transition-all",
                cfg.primaryClass,
              ].join(" ")}
            >
              {cfg.icon ? (
                cfg.icon === "chevron_right" ? (
                  <>
                    <span>{cfg.primaryLabel}</span>
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">
                      {cfg.icon}
                    </span>
                    <span>{cfg.primaryLabel}</span>
                  </>
                )
              ) : (
                <span>{cfg.primaryLabel}</span>
              )}
            </button>

            {secondary?.variant === "outline" && (
              <button
                type="button"
                onClick={onSecondaryAction}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                {secondary.label}
              </button>
            )}

            {secondary?.variant === "link" && (
              <button
                type="button"
                onClick={onSecondaryAction}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-red-500"
              >
                {secondary.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
