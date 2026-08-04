import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/db';
import { verifyPassword, createSession } from '$lib/server/auth';
import { validateEmail } from '$lib/server/validation';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = String(data.get('email') || '').trim();
    const password = String(data.get('password') || '');

    if (!email || !password) {
      return fail(400, { error: 'Email and password required', values: { email } });
    }

    if (!validateEmail(email)) {
      return fail(400, { error: 'Please enter a valid email address.', values: { email } });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return fail(401, { error: 'Invalid credentials', values: { email } });

    const ok = await verifyPassword(admin.passwordHash, password);
    if (!ok) return fail(401, { error: 'Invalid credentials', values: { email } });

    const { token, expires } = await createSession(admin.id);

    cookies.set('session', token, {
      httpOnly: true,
      path: '/',
      secure: import.meta.env.MODE === 'production',
      sameSite: 'lax',
      expires
    });

    throw redirect(303, '/admin');
  }
};
