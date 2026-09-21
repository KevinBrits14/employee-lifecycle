import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { OFFBOARDING_STATUSES, formatDate } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import SearchFilter from "@/components/SearchFilter";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; status?: string }>;
};

function checklistSummary(r: {
  exitInterview: boolean;
  equipmentReturn: boolean;
  systemAccessRemoved: boolean;
  finalPaycheck: boolean;
  knowledgeTransfer: boolean;
}) {
  const items = [
    r.exitInterview,
    r.equipmentReturn,
    r.systemAccessRemoved,
    r.finalPaycheck,
    r.knowledgeTransfer,
  ];
  const done = items.filter(Boolean).length;
  return `${done}/5`;
}

export default async function OffboardingListPage({ searchParams }: Props) {
  const { q, status } = await searchParams;
  const query = (q ?? "").trim();

  const records = await prisma.offboardingRecord.findMany({
    where: {
      AND: [
        status ? { status } : {},
        query
          ? {
              OR: [
                { fullName: { contains: query } },
                { employeeId: { contains: query } },
                { department: { contains: query } },
                { reasonForExit: { contains: query } },
              ],
            }
          : {},
      ],
    },
    orderBy: { createdDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Offboarding</h1>
          <p className="mt-1 text-sm text-slate-600">
            {records.length} record{records.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/offboarding/new"
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          New offboarding
        </Link>
      </div>

      <Suspense fallback={null}>
        <SearchFilter statuses={OFFBOARDING_STATUSES} />
      </Suspense>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Employee</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Exit date</th>
                <th className="px-4 py-3 font-medium">Checklist</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No offboarding records match your filters.
                  </td>
                </tr>
              )}
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/offboarding/${r.id}`} className="font-medium text-indigo-700 hover:underline">
                      {r.fullName}
                    </Link>
                    <p className="text-xs text-slate-500">
                      {r.employeeId}
                      {r.reasonForExit ? ` · ${r.reasonForExit}` : ""}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{r.department}</td>
                  <td className="px-4 py-3 text-slate-700">{formatDate(r.exitDate)}</td>
                  <td className="px-4 py-3 text-slate-700">{checklistSummary(r)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(r.createdDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
