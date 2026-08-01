import { prisma } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const stations = await prisma.station.findMany({ orderBy: { createdAt: 'desc' } });
  return { stations };
}
