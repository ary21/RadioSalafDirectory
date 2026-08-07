import { PrismaClient } from "@prisma/client";
import stations from "../.agent/stations.seed.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  let passwordHash = "givemepassword123";
  try {
    const { hash } = await import("argon2");
    passwordHash = await hash("givemepassword123");
  } catch (e) {
    console.warn(
      "argon2 not available — creating admin with placeholder passwordHash. Install argon2 and re-seed to secure the admin password.",
    );
  }

  // Clear existing data to make the seed script idempotent
  await prisma.session.deleteMany();
  await prisma.station.deleteMany();
  await prisma.admin.deleteMany();

  await prisma.admin.create({
    data: { email: "admin@example.com", passwordHash },
  });

  for (const s of stations) {
    await prisma.station.create({
      data: {
        name: s.name,
        city: s.city,
        frequencyLabel: s.frequencyLabel,
        websiteUrl: s.websiteUrl,
        streamUrl: s.streamUrl,
        tags: s.tags,
        status: s.status,
        visibility: s.visibility,
        permissionNote: s.note,
      },
    });
  }

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
