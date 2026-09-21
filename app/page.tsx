import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [
    activeOnboardings,
    outstandingOffboardings,
    completedOnboarding,
    completedOffboarding,
    recentOnboarding,
    recentOffboarding,
  ] = await Promise.all([
    prisma.onboardingRecord.count({
      where: { status: { in: ["Initiated", "In Progress"] } },
    }),
    prisma.offboardingRecord.count({
      where: { status: { in: ["Outstanding", "In Progress"] } },
    }),
    prisma.onboardingRecord.count({ where: { status: "Complete" } }),
    prisma.offboardingRecord.count({ where: { status: "Complete" } }),
    prisma.onboardingRecord.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.offboardingRecord.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  const recentlyCompleted = completedOnboarding + completedOffboarding;

  const cards = [
    {
      label: "Active onboardings",
      value: activeOnboardings,
      hint: "Initiated or In Progress",
      href: "/onboarding?status=In%20Progress",
      color: "bg-indigo-600",
    },
    {
      label: "Outstanding offboardings",
      value: outstandingOffboardings,
      hint: "Outstanding or In Progress",
      href: "/offboarding?status=Outstanding",
      color: "bg-amber-500",
    },
    {
      label: "Recently completed",
      value: recentlyCompleted,
      hint: "All Complete records",
      href: "/onboarding?status=Complete",
      color: "bg-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Track employee onboarding and offboarding across Matanuska.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/onboarding/new"
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            New onboarding
          </Link>
          <Link
            href="/offboarding/new"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            New offboarding
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow"
          >
            <div className={`mb-3 h-1.5 w-10 rounded-full ${card.color}`} />
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{card.value}</p>
            <p className="mt-1 text-xs text-slate-400">{card.hint}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">Recent onboarding</h2>
            <Link href="/onboarding" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {recentOnboarding.length === 0 && (
              <li className="px-4 py-6 text-sm text-slate-500">No onboarding records yet.</li>
            )}
            {recentOnboarding.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/onboarding/${r.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{r.fullName}</p>
                    <p className="truncate text-xs text-slate-500">
                      {r.employeeId} · {r.department} · starts {formatDate(r.startDate)}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">Recent offboarding</h2>
            <Link href="/offboarding" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {recentOffboarding.length === 0 && (
              <li className="px-4 py-6 text-sm text-slate-500">No offboarding records yet.</li>
            )}
            {recentOffboarding.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/offboarding/${r.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{r.fullName}</p>
                    <p className="truncate text-xs text-slate-500">
                      {r.employeeId} · {r.department} · exits {formatDate(r.exitDate)}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
