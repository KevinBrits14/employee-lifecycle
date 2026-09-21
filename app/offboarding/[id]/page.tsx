import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import DeleteButton from "@/components/DeleteButton";
import { deleteOffboarding } from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

function yn(v: boolean) {
  return v ? "Yes" : "No";
}

export default async function OffboardingDetailPage({ params }: Props) {
  const { id } = await params;
  const record = await prisma.offboardingRecord.findUnique({ where: { id } });
  if (!record) notFound();

  const fields: { label: string; value: React.ReactNode }[] = [
    { label: "Record ID", value: record.id },
    { label: "Full Name", value: record.fullName },
    { label: "Employee ID", value: record.employeeId },
    { label: "Department", value: record.department },
    { label: "Exit Date", value: formatDate(record.exitDate) },
    { label: "Reason for Exit", value: record.reasonForExit || "—" },
    { label: "Equipment Notes", value: record.equipmentNotes || "—" },
    { label: "Status", value: <StatusBadge status={record.status} /> },
    { label: "Exit Interview", value: yn(record.exitInterview) },
    { label: "Equipment Return", value: yn(record.equipmentReturn) },
    { label: "System Access Removed", value: yn(record.systemAccessRemoved) },
    { label: "Final Paycheck", value: yn(record.finalPaycheck) },
    { label: "Knowledge Transfer", value: yn(record.knowledgeTransfer) },
    { label: "Created Date", value: formatDate(record.createdDate) },
  ];

  async function remove() {
    "use server";
    await deleteOffboarding(id);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/offboarding" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            ← Back to offboarding
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{record.fullName}</h1>
          <p className="mt-1 text-sm text-slate-600">
            {record.employeeId} · {record.department}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/offboarding/${record.id}/edit`}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Edit
          </Link>
          <DeleteButton action={remove} />
        </div>
      </div>

      <dl className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
        {fields.map((f) => (
          <div key={f.label} className={f.label === "Record ID" || f.label === "Equipment Notes" ? "sm:col-span-2" : ""}>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{f.label}</dt>
            <dd className="mt-1 break-words text-sm text-slate-900">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
