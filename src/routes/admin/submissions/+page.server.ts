import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const submissions = await prisma.submission.findMany({ where: { status: 'PENDING' }, orderBy: { createdAt: 'desc' } });
  return { submissions };
};

export const actions: Actions = {
  approve: async ({ request }) => {
    const form = await request.formData();
    const id = String(form.get('id'));
    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission) throw redirect(303, '/admin/submissions');

    await prisma.station.create({
      data: {
        name: submission.name,
        city: submission.city,
        frequencyLabel: submission.frequencyLabel,
        websiteUrl: submission.websiteUrl,
        streamUrl: submission.streamUrlGuess,
        tags: null,
        status: 'PENDING_PERMISSION',
        visibility: 'PRIVATE'
      }
    });

    await prisma.submission.update({ where: { id }, data: { status: 'APPROVED' } });
    throw redirect(303, '/admin/submissions');
  },
  reject: async ({ request }) => {
    const form = await request.formData();
    const id = String(form.get('id'));
    await prisma.submission.update({ where: { id }, data: { status: 'REJECTED' } });
    throw redirect(303, '/admin/submissions');
  }
};
