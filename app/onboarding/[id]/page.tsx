import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import DeleteButton from "@/components/DeleteButton";
import { deleteOnboarding } from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function OnboardingDetailPage({ params }: Props) {
  const { id } = await params;
  const record = await prisma.onboardingRecord.findUnique({ where: { id } });
  if (!record) notFound();

  const fields: { label: string; value: React.ReactNode }[] = [
    { label: "Record ID", value: record.id },
    { label: "Employee ID", value: record.employeeId },
    { label: "Full Name", value: record.fullName },
    { label: "Email", value: record.email },
    { label: "Phone", value: record.phone || "—" },
    { label: "Position", value: record.position },
    { label: "Department", value: record.department },
    { label: "Start Date", value: formatDate(record.startDate) },
    { label: "Reporting Manager", value: record.reportingManager || "—" },
    { label: "Manager Email", value: record.managerEmail || "—" },
    { label: "Annual Salary", value: formatCurrency(record.annualSalary) },
    { label: "Equipment Needed", value: record.equipmentNeeded || "—" },
    { label: "Special Notes", value: record.specialNotes || "—" },
    { label: "Status", value: <StatusBadge status={record.status} /> },
    { label: "Created Date", value: formatDate(record.createdDate) },
  ];

  async function remove() {
    "use server";
    await deleteOnboarding(id);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/onboarding" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            ← Back to onboarding
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{record.fullName}</h1>
          <p className="mt-1 text-sm text-slate-600">
            {record.employeeId} · {record.position}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/onboarding/${record.id}/edit`}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Edit
          </Link>
          <DeleteButton action={remove} />
        </div>
      </div>

      <dl className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
        {fields.map((f) => (
          <div key={f.label} className={f.label === "Special Notes" || f.label === "Record ID" ? "sm:col-span-2" : ""}>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{f.label}</dt>
            <dd className="mt-1 break-words text-sm text-slate-900">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
