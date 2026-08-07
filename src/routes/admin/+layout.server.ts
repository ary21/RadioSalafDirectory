import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (url.pathname === '/admin/login') return {};
  if (!locals.admin) throw redirect(303, '/admin/login');
  return { admin: locals.admin };
};
