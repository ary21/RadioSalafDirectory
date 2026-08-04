import { prisma } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateSubmissionForm } from '$lib/server/validation';

export const load: PageServerLoad = async ({ url }) => {
  const submitted = url.searchParams.get('submitted') === '1';
  return { submitted };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const params = new URLSearchParams();
    form.forEach((value, key) => params.set(key, String(value)));

    const { values, errors } = validateSubmissionForm(params);
    if (Object.keys(errors).length) {
      // If caller expects JSON (AJAX), return JSON errors
      const accept = request.headers.get('accept') || '';
      if (accept.includes('application/json') || request.headers.get('x-requested-with') === 'XMLHttpRequest') {
        return new Response(JSON.stringify({ message: 'Please fix the form errors.', errors, values }), {
          status: 400,
          headers: { 'content-type': 'application/json' }
        });
      }

      return fail(400, { message: 'Please fix the form errors.', errors, values });
    }

    await prisma.submission.create({
      data: {
        name: values.name,
        city: values.city || null,
        frequencyLabel: values.frequencyLabel || null,
        websiteUrl: values.websiteUrl || null,
        streamUrlGuess: values.streamUrlGuess || null,
        note: values.note || null,
        status: 'PENDING'
      }
    });
    const accept = request.headers.get('accept') || '';
    if (accept.includes('application/json') || request.headers.get('x-requested-with') === 'XMLHttpRequest') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    throw redirect(303, '/usulkan?submitted=1');
  }
};
