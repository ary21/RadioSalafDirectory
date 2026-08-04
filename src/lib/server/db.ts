import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

export const prisma: PrismaClient = globalThis.__prisma__ ?? new PrismaClient();

if (import.meta.env.MODE !== 'production') globalThis.__prisma__ = prisma;
