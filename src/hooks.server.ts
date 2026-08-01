import { getAdminBySession } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session');
  if (token) {
    const admin = await getAdminBySession(token);
    if (admin) {
      event.locals.admin = { id: admin.id, email: admin.email };
    }
  }

  const response = await resolve(event);
  return response;
};
