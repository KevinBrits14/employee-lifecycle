import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import OnboardingForm from "@/components/OnboardingForm";
import { updateOnboarding } from "../../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditOnboardingPage({ params }: Props) {
  const { id } = await params;
  const record = await prisma.onboardingRecord.findUnique({ where: { id } });
  if (!record) notFound();

  async function save(formData: FormData) {
    "use server";
    await updateOnboarding(id, formData);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href={`/onboarding/${id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to detail
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Edit onboarding</h1>
        <p className="mt-1 text-sm text-slate-600">{record.fullName}</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <OnboardingForm action={save} defaults={record} submitLabel="Save changes" />
      </div>
    </div>
  );
}
