import { prisma } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const q = url.searchParams.get('q')?.trim() ?? '';
  const city = url.searchParams.get('city')?.trim() ?? '';
  const tag = url.searchParams.get('tag')?.trim() ?? '';

  const filters: Array<Record<string, unknown>> = [];

  if (q) {
    filters.push({
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
        { tags: { contains: q, mode: 'insensitive' } }
      ]
    });
  }

  if (city) {
    filters.push({ city: { contains: city, mode: 'insensitive' } });
  }

  if (tag) {
    filters.push({ tags: { contains: tag, mode: 'insensitive' } });
  }

  const stations = await prisma.station.findMany({
    where: {
      status: 'APPROVED_PUBLIC',
      visibility: 'PUBLIC',
      ...(filters.length ? { AND: filters } : {})
    },
    orderBy: { name: 'asc' }
  });

  return {
    stations,
    filters: { q, city, tag }
  };
}
