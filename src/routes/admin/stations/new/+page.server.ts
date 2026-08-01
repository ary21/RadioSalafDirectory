import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/db';
import { validateStationForm } from '$lib/server/validation';

export const actions: Actions = {
  default: async ({ request }) => {
    const raw = await request.formData();
    const form = new URLSearchParams();
    raw.forEach((value, key) => form.set(key, String(value)));

    const { values, errors } = validateStationForm(form);
    if (Object.keys(errors).length) {
      return fail(400, { errors, values, message: 'Please fix validation errors.' });
    }

    await prisma.station.create({
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
  }
};
