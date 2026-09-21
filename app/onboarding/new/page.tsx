import Link from "next/link";
import OnboardingForm from "@/components/OnboardingForm";
import { createOnboarding } from "../actions";

export default function NewOnboardingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/onboarding" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to onboarding
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">New onboarding</h1>
        <p className="mt-1 text-sm text-slate-600">Create a new employee onboarding record.</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <OnboardingForm action={createOnboarding} submitLabel="Create record" />
      </div>
    </div>
  );
}
