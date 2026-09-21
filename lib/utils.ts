export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function toDateInputValue(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function formatCurrency(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export const ONBOARDING_STATUSES = ["Initiated", "In Progress", "Complete"] as const;
export const OFFBOARDING_STATUSES = ["Outstanding", "In Progress", "Complete"] as const;

export type OnboardingStatus = (typeof ONBOARDING_STATUSES)[number];
export type OffboardingStatus = (typeof OFFBOARDING_STATUSES)[number];

export function statusBadgeClass(status: string): string {
  switch (status) {
    case "Initiated":
    case "Outstanding":
      return "bg-amber-100 text-amber-800 ring-amber-600/20";
    case "In Progress":
      return "bg-blue-100 text-blue-800 ring-blue-600/20";
    case "Complete":
      return "bg-emerald-100 text-emerald-800 ring-emerald-600/20";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-500/20";
  }
}
