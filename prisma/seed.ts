import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.offboardingRecord.deleteMany();
  await prisma.onboardingRecord.deleteMany();

  await prisma.onboardingRecord.create({
    data: {
      employeeId: "EMP001",
      fullName: "John Smith",
      email: "john.smith@matanuska.co.zw",
      phone: "+263 4 123 4567",
      position: "Warehouse Supervisor",
      department: "Warehouse & Logistics",
      startDate: new Date("2026-10-01"),
      reportingManager: "Jane Doe",
      managerEmail: "jane.doe@matanuska.co.zw",
      annualSalary: 45000,
      equipmentNeeded: "Laptop/Headset/Access Card",
      specialNotes: "Bilingual English/Shona",
      status: "Initiated",
      createdDate: new Date("2026-09-21"),
    },
  });

  await prisma.offboardingRecord.create({
    data: {
      fullName: "Jane Doe",
      employeeId: "EMP002",
      department: "ICT",
      exitDate: new Date("2026-09-30"),
      reasonForExit: "Resignation",
      equipmentNotes: "Laptop",
      status: "Outstanding",
      exitInterview: false,
      equipmentReturn: false,
      systemAccessRemoved: true,
      finalPaycheck: false,
      knowledgeTransfer: false,
      createdDate: new Date("2026-09-21"),
    },
  });

  console.log("Seeded 1 onboarding and 1 offboarding sample record.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
