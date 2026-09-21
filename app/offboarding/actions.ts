"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OFFBOARDING_STATUSES } from "@/lib/utils";

function parseForm(formData: FormData) {
  const status = String(formData.get("status") || "Outstanding");
  if (!OFFBOARDING_STATUSES.includes(status as (typeof OFFBOARDING_STATUSES)[number])) {
    throw new Error("Invalid status");
  }
  return {
    fullName: String(formData.get("fullName") || "").trim(),
    employeeId: String(formData.get("employeeId") || "").trim(),
    department: String(formData.get("department") || "").trim(),
    exitDate: new Date(String(formData.get("exitDate"))),
    reasonForExit: String(formData.get("reasonForExit") || "").trim() || null,
    equipmentNotes: String(formData.get("equipmentNotes") || "").trim() || null,
    status,
    exitInterview: formData.get("exitInterview") === "on",
    equipmentReturn: formData.get("equipmentReturn") === "on",
    systemAccessRemoved: formData.get("systemAccessRemoved") === "on",
    finalPaycheck: formData.get("finalPaycheck") === "on",
    knowledgeTransfer: formData.get("knowledgeTransfer") === "on",
  };
}

export async function createOffboarding(formData: FormData) {
  const data = parseForm(formData);
  if (!data.fullName || !data.employeeId || !data.department) {
    throw new Error("Missing required fields");
  }
  const record = await prisma.offboardingRecord.create({ data });
  revalidatePath("/");
  revalidatePath("/offboarding");
  redirect(`/offboarding/${record.id}`);
}

export async function updateOffboarding(id: string, formData: FormData) {
  const data = parseForm(formData);
  await prisma.offboardingRecord.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/offboarding");
  revalidatePath(`/offboarding/${id}`);
  redirect(`/offboarding/${id}`);
}

export async function deleteOffboarding(id: string) {
  await prisma.offboardingRecord.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/offboarding");
  redirect("/offboarding");
}
