import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { validateStationForm } from '$lib/server/validation';

export const load: PageServerLoad = async ({ params }) => {
  const station = await prisma.station.findUnique({ where: { id: params.id } });
  if (!station) throw redirect(303, '/admin');
  return { station };
};

export const actions: Actions = {
  update: async ({ request, params }) => {
    const raw = await request.formData();
    const form = new URLSearchParams();
    raw.forEach((value, key) => form.set(key, String(value)));

    const { values, errors } = validateStationForm(form);
    if (Object.keys(errors).length) {
      return fail(400, { errors, values, message: 'Please fix validation errors.' });
    }

    await prisma.station.update({
      where: { id: params.id },
      data: {
        name: values.name,
        city: values.city || null,
        frequencyLabel: values.frequencyLabel || null,
        websiteUrl: values.websiteUrl || null,
        streamUrl: values.streamUrl || null,
        tags: values.tags || null,
        status: values.status,
        visibility: values.visibility
      }
    });

    throw redirect(303, '/admin');
  },
  delete: async ({ params }) => {
    await prisma.station.delete({ where: { id: params.id } });
    throw redirect(303, '/admin');
  }
};
