"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ONBOARDING_STATUSES } from "@/lib/utils";

function parseForm(formData: FormData) {
  const status = String(formData.get("status") || "Initiated");
  if (!ONBOARDING_STATUSES.includes(status as (typeof ONBOARDING_STATUSES)[number])) {
    throw new Error("Invalid status");
  }
  const salaryRaw = String(formData.get("annualSalary") || "").trim();
  return {
    employeeId: String(formData.get("employeeId") || "").trim(),
    fullName: String(formData.get("fullName") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim() || null,
    position: String(formData.get("position") || "").trim(),
    department: String(formData.get("department") || "").trim(),
    startDate: new Date(String(formData.get("startDate"))),
    reportingManager: String(formData.get("reportingManager") || "").trim() || null,
    managerEmail: String(formData.get("managerEmail") || "").trim() || null,
    annualSalary: salaryRaw ? Number(salaryRaw) : null,
    equipmentNeeded: String(formData.get("equipmentNeeded") || "").trim() || null,
    specialNotes: String(formData.get("specialNotes") || "").trim() || null,
    status,
  };
}

export async function createOnboarding(formData: FormData) {
  const data = parseForm(formData);
  if (!data.employeeId || !data.fullName || !data.email || !data.position || !data.department) {
    throw new Error("Missing required fields");
  }
  const record = await prisma.onboardingRecord.create({ data });
  revalidatePath("/");
  revalidatePath("/onboarding");
  redirect(`/onboarding/${record.id}`);
}

export async function updateOnboarding(id: string, formData: FormData) {
  const data = parseForm(formData);
  await prisma.onboardingRecord.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/onboarding");
  revalidatePath(`/onboarding/${id}`);
  redirect(`/onboarding/${id}`);
}

export async function deleteOnboarding(id: string) {
  await prisma.onboardingRecord.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/onboarding");
  redirect("/onboarding");
}
