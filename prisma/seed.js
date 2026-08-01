const { PrismaClient } = require('@prisma/client');
const stations = require('../.agents/stations.seed.json');

const prisma = new PrismaClient();

async function main() {
  // Create default admin (passwordHash placeholder — replace after installing argon2)
  await prisma.admin.create({
    data: { email: 'admin@example.com', passwordHash: 'changeme' }
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
        permissionNote: s.note
      }
    });
  }

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
