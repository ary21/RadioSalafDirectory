import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

function createPrismaClient() {
  const isProd = import.meta.env?.MODE === 'production' || process.env.NODE_ENV === 'production';
  if (isProd) {
    const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    if (url && (url.startsWith('libsql://') || url.startsWith('wss://') || url.startsWith('ws://'))) {
      const client = createClient({ url, authToken });
      const adapter = new PrismaLibSql(client);
      return new PrismaClient({ adapter });
    }
  }
  return new PrismaClient();
}

export const prisma: PrismaClient = globalThis.__prisma__ ?? createPrismaClient();

if (typeof import.meta.env !== 'undefined' && import.meta.env.MODE !== 'production') {
  globalThis.__prisma__ = prisma;
}
