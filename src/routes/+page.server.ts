import { prisma } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const stations = await prisma.station.findMany({ where: { status: 'APPROVED_PUBLIC' } });
  return { stations };
}
