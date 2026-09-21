import Link from "next/link";
import OffboardingForm from "@/components/OffboardingForm";
import { createOffboarding } from "../actions";

export default function NewOffboardingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/offboarding" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to offboarding
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">New offboarding</h1>
        <p className="mt-1 text-sm text-slate-600">Create a new employee offboarding record.</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <OffboardingForm action={createOffboarding} submitLabel="Create record" />
      </div>
    </div>
  );
}
